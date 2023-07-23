import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "./entities/project.entity";
import { ProjectCategoryEntity } from "./entities/project_category.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectEntity,
            ProjectCategoryEntity,
        ])
    ],
    providers: [
        ProjectService,
    ],
    controllers: [
        ProjectController
    ]
})
export class ProjectModule {}