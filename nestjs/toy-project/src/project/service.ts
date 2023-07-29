import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectEntity } from "./entities/project";
import { ProjectCategoryEntity } from "./entities/projectCategory";

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
}

export default ProjectService;