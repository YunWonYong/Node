import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectCategoryEntity } from "./entities/projectCategory";
import { ListResult } from "src/common/types";
import { ProjectCategoryDTO } from "./dto/ProjectCategoryDTO";

@Injectable()
class ProjectCategoryService {
        
    @InjectRepository(ProjectCategoryEntity)
    private readonly repository: Repository<ProjectCategoryEntity>;

    public list(): Promise<ListResult> {
        return new Promise((resolve, rejects) => {
            this.repository
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
    
    public regist(categoryDTO: ProjectCategoryDTO): Promise<string> {
        const entity = new ProjectCategoryEntity();
        entity.categoryCode = categoryDTO.categoryCode;
        entity.categoryName = categoryDTO.categoryName;
        entity.registUser = categoryDTO.registUser;
        return new Promise((resolve, reject) => {
            this.codeDuplicateCheck(categoryDTO.categoryCode)
                .then(() => {
                    this.repository
                        .save(entity)
                        .then((result) => {
                            resolve(result.categoryCode === categoryDTO.categoryCode? "success": "fail");
                        })
                        .catch(reject);
                })
                .catch(reject)
        });
    }

    public codeDuplicateCheck(code: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const option = {
                where: {
                    categoryCode: code
                }
            };

            this.repository
                .findOne(option)
                .then((categoryEntity) => {
                    if (categoryEntity !== null) {
                        reject(new ForbiddenException(`${code} duplicate`));
                        return;
                    }        
                    resolve();
                })
                .catch(reject);
        });
    }
}

export default ProjectCategoryService;