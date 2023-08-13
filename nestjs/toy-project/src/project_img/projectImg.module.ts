import { Module } from "@nestjs/common";
import ProjectImgService from "./projectImg.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectImgEntity } from "./entities/projectImg";
import ProjectImgController from "./projectImg.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectImgEntity
        ])
    ],
    controllers: [
        ProjectImgController
    ],
    providers: [
        ProjectImgService
    ]
})
export default class ProjectImgModule{}