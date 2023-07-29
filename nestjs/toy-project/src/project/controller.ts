import ProjectService from "./service";
import { Param } from "@nestjs/common";
import { ControllerSwg, GetSwg } from "src/config/swagger/decorators";
import { Get } from "@nestjs/common";

@ControllerSwg("project")
class ProjectController {
    constructor(private readonly service: ProjectService) {}
    
    @Get("category")
    async categoryList() {
        return await this.service.categoryList();
    }

    @GetSwg({
        swagger: {
            summary: "프로젝트 목록 조회",
            desc: "생성된 프로젝트 전체 조회"
        }
    })
    async list() {
        return this.service.list();
    }

    @GetSwg({
        path: ":start/:end",
        swagger: {
            summary: "프로젝트 페이징 처리한 목록 조회",
            desc: "start: offset, end: limit"
        }
    })
    async findAll(@Param("start") start: number, @Param("end") end: number) {
        return this.service.findAll(start, end);
    }

    @GetSwg({
        path: ":projectID",
        swagger: {
            summary: "프로젝트를 상세 조회",
            desc: "projectID에 해당하는 project 관련된 모든 정보 조회"
        }
    })
    async find(@Param("projectID") projectID: number) {
        return this.service.find(projectID); 
    }
}

export default ProjectController;
