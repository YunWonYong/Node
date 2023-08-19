import { Module } from "@nestjs/common";
import ProjectReplyController from "./projectReply.controller";
import ProjectReplyService from "./projectReply.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectReplyEntity } from "./entities/projectReply";
import { ProjectEntity } from "src/project/entities/project";
import ProjectService from "src/project/project.service";
import ProjectModule from "src/project/project.module";
import TransactionService from "src/common/orm/transection";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProjectReplyEntity,
            ProjectEntity
        ]),
        ProjectModule
    ],
    controllers: [
        ProjectReplyController
    ],
    providers: [
        ProjectReplyService,
        ProjectService,
        TransactionService
    ]
})
export default class ProjectReplyModule{}