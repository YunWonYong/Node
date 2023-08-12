import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectEntity } from "./entities/project";
import { ProjectListDTO, ProjectRegistDTO } from "./dto";
import { ListResult, RegistResultType } from "src/common/types";
import { dtoToSetterEntity, getterEntityListToDTOList } from "src/common/util";
import { CompanyEntity } from "src/company/entities/company";
import { ProjectCategoryEntity } from "src/project_category/entities/projectCategory";

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
                .getMany()
                .then((list) => {
                    resolve({
                        list: getterEntityListToDTOList(list, new ProjectListDTO()),
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

    public find(projectID: number): Promise<any> {
        return new Promise((resolve) => {
            resolve(projectID);
        });
    }
}

export default ProjectService;