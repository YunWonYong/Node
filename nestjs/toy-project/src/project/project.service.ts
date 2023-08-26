import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryRunner } from "typeorm";
import { ProjectEntity } from "./entities/project";
import { ProjectListDTO, ProjectRegistDTO } from "./dto";
import { ListResult, RegistResultType } from "src/common/types";
import { dtoToSetterEntity, getterEntityListToDTOList } from "src/common/util";
import { CompanyEntity } from "src/company/entities/company";
import { ProjectCategoryEntity } from "src/project_category/entities/projectCategory";
import { ProjectImgEntity } from "src/project_img/entities/projectImg";
import { ProjectReplyEntity } from "src/project_reply/entities/projectReply";
import ProjectReadDTO from "./dto/ProjectReadDTO";

@Injectable()
class ProjectService {

    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>;

    public list(): Promise<ListResult<ProjectListDTO>> {
        return new Promise((resolve, reject) => {
            this.repository
                .createQueryBuilder("p")
                .innerJoinAndSelect("p.category", "pc", "p.category_code = pc.category_code", ProjectCategoryEntity)
                .innerJoinAndSelect("p.company", "c", "p.company_no = c.company_no", CompanyEntity)
                .leftJoinAndSelect("p.imgs", "pi", "p.no = pi.no", ProjectImgEntity)
                .getMany()
                .then((list) => {
                    resolve({
                        list: getterEntityListToDTOList<ProjectEntity[], ProjectListDTO>(list, ProjectListDTO),
                        total: list.length
                    });
                })
                .catch(reject)
        });
    }

    public regist(dto: ProjectRegistDTO): Promise<RegistResultType<number>> {
        return new Promise((resolve, reject) => {
            const entity = dtoToSetterEntity(dto, new ProjectEntity());
            this.repository
                .save(entity)
                .then((saveEntity) => {
                    resolve({
                        result: saveEntity.name === dto.name? "success": "fail",
                        pk: saveEntity.no
                    });
                })
                .catch(reject);
        });
    }

    public findAll(start: number, end: number): Promise<any> {
        return new Promise((resolve) => {
            resolve({
                start,
                end
            });
        });
    }

    public find(no: number): Promise<ProjectReadDTO> {
        return new Promise((resolve, reject) => {
            this.repository
                .createQueryBuilder("p")
                .where({
                    no
                })
                .innerJoinAndSelect("p.category", "pc", "p.category_code = pc.category_code", ProjectCategoryEntity)
                .innerJoinAndSelect("p.company", "c", "p.company_no = c.company_no", CompanyEntity)
                .leftJoinAndSelect("p.imgs", "pi", "p.no = pi.no", ProjectImgEntity)
                .leftJoinAndSelect("p.replys", "pr", "p.no = pr.no", ProjectReplyEntity)
                .orderBy("CASE WHEN pr.parent IS NOT NULL THEN pr.parent ELSE pr.reply_no END", "ASC")
                .getMany()
                .then((list) => {
                    resolve(getterEntityListToDTOList<ProjectEntity[], ProjectReadDTO>(list, ProjectReadDTO)[0]);
                })
                .catch(reject)
        });
    }

    public projectNoCheck(projectNo: number, connect: QueryRunner): Promise<void> {
        return new Promise((resolve, reject) => {
            connect
            .query("SELECT  1  FROM project WHERE no = $1;", [projectNo])
            .then((result: object[]) => {
                if (result.length === 1) {
                    resolve();
                    return;
                }
                reject(new NotFoundException(`${projectNo} not found project number`));
            })
            .catch(reject);
        });
    }
}

export default ProjectService;