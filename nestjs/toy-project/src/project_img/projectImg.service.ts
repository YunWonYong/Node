import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner } from "typeorm";
import ProjectImgRegistDTO from "./dto/ProjectImgRegistDTO";
import { RegistResultType } from "src/common/types";
import { ProjectImgEntity } from "./entities/projectImg";

type QueryResult = {
    command: string,
    rowCount: number,
    rows: object[]
};

@Injectable()
class ProjectImgService {

    @InjectRepository(ProjectImgEntity)
    private readonly repository: Repository<ProjectImgEntity>;

    @InjectDataSource()
    private readonly dataSource: DataSource;
    
    public regist(projectNo: number, dtos: ProjectImgRegistDTO[]): Promise<RegistResultType<number[]>> {
        return new Promise(async (resolve, reject) => {
            const queryRunner = this.dataSource.createQueryRunner();
            try {
                await queryRunner.connect();

                const flag = await this.projectNoCheck(projectNo, queryRunner);

                if (!flag) {
                    reject(new NotFoundException(`${projectNo} not found project number`))
                    return;
                }
                await queryRunner.startTransaction();
                const pks: number[] = [];

                await Promise.all(dtos.map((dto: ProjectImgRegistDTO) => {
                    const entity = new ProjectImgEntity();
                    entity.no = projectNo;
                    entity.imgNo = dto.imgNo;
                    entity.url = dto.url;
                    pks.push(dto.imgNo);
                    return queryRunner.manager.save(entity);
                }));

                const result = await queryRunner.commitTransaction();
                console.log(result);
                resolve({
                    result: "success",
                    pk: pks
                });
            } catch(e) {
                await queryRunner.rollbackTransaction();
                reject(e);
            } finally {
                await queryRunner.release();
            }
        });
    }

    public projectNoCheck(projectNo: number, connect: QueryRunner): Promise<boolean> {
        return new Promise((resolve, reject) => {
            connect
            .query("SELECT  1  FROM project WHERE no = $1;", [projectNo])
            .then((result: object[]) => {
                console.log(result);
                resolve(result.length === 1);
            })
            .catch(reject);
        });
    }
}

export default ProjectImgService;