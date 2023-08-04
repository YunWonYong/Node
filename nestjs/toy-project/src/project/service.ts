import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectEntity } from "./entities/project";
import { ProjectCategoryEntity } from "./entities/projectCategory";
import { ProjectCategoryDTO } from "./dto/ProjectCategoryDTO";

type ListResult = {
    list: any[],
    total: number
};
@Injectable()
class ProjectService {

    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>;

    @InjectRepository(ProjectCategoryEntity)
    private readonly categoryRepository: Repository<ProjectCategoryEntity>;

    public list(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.repository
                .find()
                .then(resolve)
                .catch(reject)
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

    public categoryList(): Promise<ListResult> {
        return new Promise((resolve, rejects) => {
            this.categoryRepository
            .findAndCount()
            .then((result: [ProjectCategoryEntity[], number] ) => {
                const [list, total] = result;
                resolve({
                    list,
                    total
                });
            })
            .catch(rejects)
        });
    }

    public categoryRegist(categoryDTO: ProjectCategoryDTO): Promise<string> {
        const entity = new ProjectCategoryEntity();
        entity.categoryCode = categoryDTO.categoryCode;
        entity.categoryName = categoryDTO.categoryName;
        entity.registUser = categoryDTO.registUser;
        return new Promise((resolve, reject) => {
            this.categoryCodeDuplicateCheck(categoryDTO.categoryCode)
                .then(() => {
                    this.categoryRepository
                        .save(entity)
                        .then((result) => {
                            resolve(result.categoryCode === categoryDTO.categoryCode? "success": "fail");
                        })
                        .catch(reject);
                })
                .catch(reject)
        });
    }

    public categoryCodeDuplicateCheck(code: number): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const option = {
                    where: {
                        categoryCode: code
                    }
                };
                const categoryEntity = this.categoryRepository.findOne(option);
                
                if (categoryEntity !== null) {
                    throw new ForbiddenException(`${code} duplicate`)
                }

                resolve();

            } catch(e) {
                reject(e);
            }
        });
    }
}

export default ProjectService;