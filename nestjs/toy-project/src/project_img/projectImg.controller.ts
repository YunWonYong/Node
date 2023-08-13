import { Body, Param } from "@nestjs/common";
import { ControllerSwg, PostSwg } from "src/decorators/swagger";
import ProjectImgService from "./projectImg.service";
import ProjectImgRegistDTO from "./dto/ProjectImgRegistDTO";

@ControllerSwg("project-img")
class ProjectImgController {
    constructor(private readonly service: ProjectImgService) {}

    @PostSwg({
        path: ":projectNo",
        swagger: {
            summary: "프로젝트 이미지 추가",
            desc: "프로젝트 이미지 업로드한 정보 추가"
        },
        requestBody: {
            type: ProjectImgRegistDTO,
            isArray: true
        },
        responseList: []
    })
    async regist(@Param("projectNo") projectNo: number, @Body() dtos: ProjectImgRegistDTO[]) {
        return await this.service.regist(projectNo, dtos);
    }
}

export default ProjectImgController;