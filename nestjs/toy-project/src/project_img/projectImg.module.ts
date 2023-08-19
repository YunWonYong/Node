import { Module } from "@nestjs/common";
import ProjectImgService from "./projectImg.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectImgEntity } from "./entities/projectImg";
import ProjectImgController from "./projectImg.controller";
import ProjectService from "src/project/project.service";
import ProjectModule from "src/project/project.module";
import { ProjectEntity } from "src/project/entities/project";
import TransactionService from "src/common/orm/transection";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectImgEntity,
            ProjectEntity
        ]),
        ProjectModule
    ],
    controllers: [
        ProjectImgController
    ],
    providers: [
        ProjectImgService,
        ProjectService,
        TransactionService
    ]
})
export default class ProjectImgModule{}