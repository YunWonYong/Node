import { Module } from "@nestjs/common";
import ProjectController from "./controller";
import ProjectService from "./service";

@Module({
    controllers: [
        ProjectController
    ],
    providers: [
        ProjectService
    ]
})
export default class ProjectModule {}