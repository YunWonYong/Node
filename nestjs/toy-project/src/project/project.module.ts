import { Module } from "@nestjs/common";
import ProjectController from "./project.controller";
import ProjectService from "./project.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "./entities/project";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectEntity,
        ])
    ],
    controllers: [
        ProjectController
    ],
    providers: [
        ProjectService
    ]
})
export default class ProjectModule {}