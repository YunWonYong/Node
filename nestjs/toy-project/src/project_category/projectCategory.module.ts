import { Module } from "@nestjs/common";
import ProjectCategoryController from "./projectCategory.controller";
import ProjectCategoryService from "./projectCategory.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectCategoryEntity } from "./entities/projectCategory";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectCategoryEntity
        ])
    ],
    controllers: [
        ProjectCategoryController
    ],
    providers: [
        ProjectCategoryService
    ]
})
export default class ProjectCategoryModule {}
