import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, QueryRunner } from "typeorm";
import ProjectImgRegistDTO from "./dto/ProjectImgRegistDTO";
import { RegistResultType } from "src/common/types";
import { ProjectImgEntity } from "./entities/projectImg";
import ProjectService from "../project/project.service";
import TransactionService from "src/common/orm/transection";

@Injectable()
class ProjectImgService {

    @InjectRepository(ProjectImgEntity)
    private readonly repository: Repository<ProjectImgEntity>;

    constructor(
        private readonly projectService: ProjectService,
        private readonly transaction: TransactionService
    ) {}

    public regist(projectNo: number, dtos: ProjectImgRegistDTO[]): Promise<RegistResultType<number[]>> {
        return new Promise(async (resolve, reject) => {
            const pks: number[] = [];

            this.transaction.do<void>({
                prevJob: (queryRunner: QueryRunner) => {
                    return new Promise((resolve, reject) => {
                        this.projectService
                            .projectNoCheck(projectNo, queryRunner)
                            .then(resolve)
                            .catch(reject);
                    });
                },
                mainJob: (queryRunner: QueryRunner) => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            await Promise.all(dtos.map((dto: ProjectImgRegistDTO) => {
                                const entity = new ProjectImgEntity();
                                entity.no = projectNo;
                                entity.imgNo = dto.imgNo;
                                entity.url = dto.url;
                                pks.push(dto.imgNo);
                                return queryRunner.manager.save(entity);
                            }));
                            resolve();
                        } catch(e) {
                            reject(e);
                        }
                    });
                }
            })
            .then(() => {
                resolve({
                    result: "success",
                    pk: pks
                });
            })
            .catch(reject);
        });
    }

    // public regist(projectNo: number, dtos: ProjectImgRegistDTO[]): Promise<RegistResultType<number[]>> {
    //     return new Promise(async (resolve, reject) => {
    //         const queryRunner = this.dataSource.createQueryRunner();
    //         try {
    //             await queryRunner.connect();

    //             await this.projectService.projectNoCheck(projectNo, queryRunner);
    //             // [TODO] logging
    //             await queryRunner.startTransaction();
    //             const pks: number[] = [];

    //             await Promise.all(dtos.map((dto: ProjectImgRegistDTO) => {
    //                 const entity = new ProjectImgEntity();
    //                 entity.no = projectNo;
    //                 entity.imgNo = dto.imgNo;
    //                 entity.url = dto.url;
    //                 pks.push(dto.imgNo);
    //                 return queryRunner.manager.save(entity);
    //             }));

    //             await queryRunner.commitTransaction();
    //             resolve({
    //                 result: "success",
    //                 pk: pks
    //             });
    //         } catch(e) {
    //             await queryRunner.rollbackTransaction();
    //             reject(e);
    //         } finally {
    //             await queryRunner.release();
    //         }
    //     });
    // }
}

export default ProjectImgService;