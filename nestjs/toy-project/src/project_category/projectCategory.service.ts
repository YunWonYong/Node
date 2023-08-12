import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectCategoryEntity } from "./entities/projectCategory";
import { ListResult } from "src/common/types";
import { ProjectCategoryListDTO, ProjectCategoryRegistDTO } from "./dto";
import { dtoToEntity, entityListToDTOList } from "src/common/util";

@Injectable()
class ProjectCategoryService {
        
    @InjectRepository(ProjectCategoryEntity)
    private readonly repository: Repository<ProjectCategoryEntity>;

    public list(): Promise<ListResult<ProjectCategoryListDTO>> {
        return new Promise((resolve, rejects) => {
            this.repository
            .findAndCount()
            .then((result: [ProjectCategoryEntity[], number] ) => {
                const [list, total] = result;
                const listDTO = new ProjectCategoryListDTO();
                listDTO.categoryCode = 0;
                listDTO.categoryName = "";
                resolve({
                    list: entityListToDTOList(list, listDTO),
                    total
                });
            })
            .catch(rejects)
        });
    }
    
    public regist(dto: ProjectCategoryRegistDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            this.codeDuplicateCheck(dto.categoryCode)
                .then(() => {
                    const entity = dtoToEntity(dto, new ProjectCategoryEntity());          
                    this.repository
                        .save(entity)
                        .then((result) => {
                            resolve(result.categoryCode === dto.categoryCode? "success": "fail");
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