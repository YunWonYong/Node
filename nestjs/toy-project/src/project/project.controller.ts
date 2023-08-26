import ProjectService from "./project.service";
import { Param, Body } from "@nestjs/common";
import { ControllerSwg, GetSwg } from "../decorators/swagger";
import { PostSwg } from "src/decorators/swagger/post";
import { ListResult, RegistResultType } from "src/common/types";
import { ProjectListDTO, ProjectRegistDTO } from "./dto";

@ControllerSwg("project")
class ProjectController {
    constructor(private readonly service: ProjectService) {}

    @GetSwg({
        swagger: {
            summary: "프로젝트 목록 조회",
            desc: "생성된 프로젝트 전체 조회"
        }
    })
    async list(): Promise<ListResult<ProjectListDTO>> {
        return await this.service.list();
    }

    @PostSwg({
        swagger: {
            summary: "프로젝트 생성",
            desc: "프로젝트를 생성함."
        },
        responseList: [
            {
                status: 201
            }
        ]
    })
    async regist(@Body() dto: ProjectRegistDTO): Promise<RegistResultType<number>> {
        return await this.service.regist(dto);
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
        path: ":projectNo",
        swagger: {
            summary: "프로젝트를 상세 조회",
            desc: "projectNo 해당하는 project 관련된 모든 정보 조회"
        }
    })
    async find(@Param("projectNo") no: number) {
        return await this.service.find(no); 
    }
}

export default ProjectController;
