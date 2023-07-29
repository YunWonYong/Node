import { Injectable } from "@nestjs/common";

@Injectable()
class ProjectService {
    public list(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve("z");   
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