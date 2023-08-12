import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectEntity } from "./entities/project";
import { ProjectRegistDTO } from "./dto/ProjectRegistDTO";

@Injectable()
class ProjectService {

    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>;

    public list(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.repository
                .find()
                .then(resolve)
                .catch(reject)
        });
    }

    public regist(dto: ProjectRegistDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                console.log(dto);
                resolve("success");
            } catch(e) {
                reject(e);
            }
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