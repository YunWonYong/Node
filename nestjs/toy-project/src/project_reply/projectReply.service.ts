import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from "typeorm";
import { ProjectReplyEntity } from "./entities/projectReply";
import { ObjectType, RegistResultType } from "src/common/types";
import ProjectReplyRegistDTO from "./dto/ProjectReplyRegistDTO";
import ProjectService from "src/project/project.service";
import TransactionService from "src/common/orm/transection";

type ReplyNoGenerateQueryResult = {
    next: string | null
};

@Injectable()
class ProjectReplyService {
    @InjectRepository(ProjectReplyEntity)
    private readonly repository: Repository<ProjectReplyEntity>;

    constructor(
        private readonly projectService: ProjectService,
        private readonly transaction: TransactionService
    ) {}

    public regist(no: number, dto: ProjectReplyRegistDTO): Promise<RegistResultType<ObjectType<number>>> {
        return new Promise(async (resolve, reject) => {
            const registResult: RegistResultType<ObjectType<number>> = {
                result: "fail",
                pk: {}
            };
            this.transaction.do<ProjectReplyEntity>({
                prevJob: (queryRunner: QueryRunner) => {
                    return new Promise(async (rsolve, reject) => {
                        try {
                            await this.projectService.projectNoCheck(no, queryRunner);
                            const replyNo = await this.replyNoGenerate(no, queryRunner);
                            const entity = this.getRegistEntity(no, replyNo, dto);
                            rsolve(entity);
                        } catch(e) {
                            reject(e);
                        }
                    })
                },
                mainJob(queryRunner: QueryRunner, entity: ProjectReplyEntity) {
                    return new Promise((resolve, reject) => {
                        queryRunner
                        .manager
                        .save(entity)
                        .then(() => {
                            registResult.result = "success";
                            registResult.pk = {
                                no,
                                replyNo: entity.replyNo
                            };
                            resolve();
                        })
                        .catch(reject);
                    })
                },
            })
            .then(() => {
                resolve(registResult);
            })
            .catch(reject);
        });
    }

    public childRegist(no: number, dto: ProjectReplyRegistDTO): Promise<RegistResultType<ObjectType<number>>> {
        return new Promise((resolve, reject) => {
            const registResult: RegistResultType<ObjectType<number>> = {
                result: "fail",
                pk: {}
            };
            this.transaction.do<ProjectReplyEntity>({
                prevJob: (queryRunner: QueryRunner) => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const replyNo = await this.pkCheckAndReplyNoGenerate(no, dto.parent, queryRunner);
                            resolve(this.getRegistEntity(no, replyNo, dto));
                        } catch(e) {
                            reject(e);
                        }
                    })
                },
                mainJob(queryRunner: QueryRunner, entity: ProjectReplyEntity) {
                    return new Promise((resolve, reject) => {
                        queryRunner
                        .manager
                        .save(entity)
                        .then(() => {
                            registResult.result = "success";
                            registResult.pk = {
                                no,
                                replyNo: entity.replyNo,
                                parentReplyNo: entity.parent
                            };
                            resolve();
                        })
                        .catch(reject);
                    })
                }, 
            })
            .then(() => {
                resolve(registResult);
            })
            .catch(reject);
        });
    }

    private pkCheckAndReplyNoGenerate(no: number, replyNo: number, queryRunner: QueryRunner): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.projectService.projectNoCheck(no, queryRunner);
                const result = await queryRunner
                .query(`
SELECT  reply_no AS next 
  FROM  project_reply
 WHERE  no = $1
   AND  reply_no = $2
 UNION  ALL
SELECT  MAX(reply_no)
  FROM  project_reply
 WHERE  no = $1 
                `, [no, replyNo]);
                if (result.length !== 2) {
                    throw new NotFoundException(`${no} project and ${replyNo} parent reply not found`);
                }

                const generateResult = result[1] as ReplyNoGenerateQueryResult;
                resolve(this.strReplyNoToNum(generateResult.next));
            } catch(e) {
                reject(e);
            }
        });
    }

    private replyNoGenerate(projectNo: number, queryRunner: QueryRunner): Promise<number> {
        return new Promise((resolve, reject) => {
            queryRunner
            .query("SELECT  MAX(reply_no) AS next  FROM project_reply WHERE no = $1;", [projectNo])
            .then((result: ReplyNoGenerateQueryResult[]) => {
                const row = result[0];
                if (!row) {
                    throw new Error(`replyNo generator query result empty. ${result.length}`);
                }
                resolve(this.strReplyNoToNum(row.next));
            })
            .catch(reject);
        });
    }

    private getRegistEntity(no: number, replyNo: number, dto: ProjectReplyRegistDTO): ProjectReplyEntity {
        const entity = new ProjectReplyEntity();
        entity.no = no;
        entity.replyNo = replyNo;
        entity.content = dto.content;
        if (dto.parent) {
            entity.parent = dto.parent;
        }
        entity.registUser = dto.registUser;
        return entity;
    }

    private strReplyNoToNum(strReplyNo: string | null): number {
        const replyNo = strReplyNo === null? 0: parseInt(strReplyNo);
        return replyNo + 1;
    }
}

export default ProjectReplyService;