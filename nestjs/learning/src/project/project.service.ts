import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectEntity } from "./entities/project.entity";

type findAllResultType = {
    list: ProjectEntity[],
    total: number
};

@Injectable()
export class ProjectService {

    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>
    constructor() {
        console.log();
    }

    async findAll(offset: number, limit: number): Promise<findAllResultType> {
        const [list, total] = await this.projectRepository.findAndCount({
            take: limit,
            skip: offset
        });
        return {
            list,
            total
        };
    }
}