import { Module } from "@nestjs/common";
import ProjectController from "./project.controller";
import ProjectService from "./project.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "./entities/project";
import { ProjectCategoryEntity } from "../project_category/entities/projectCategory";
@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectEntity,
            ProjectCategoryEntity
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