import { Param, Body } from "@nestjs/common";
import { ControllerSwg, PostSwg } from "src/decorators/swagger";
import ProjectReplyService from "./projectReply.service";
import ProjectReplyRegistDTO from "./dto/ProjectReplyRegistDTO";
import { ObjectType, RegistResultType } from "src/common/types";

@ControllerSwg("project-reply")
class ProjectReplyController {
    constructor(private readonly service: ProjectReplyService) {}


    @PostSwg({
        path: ":no",
        swagger: {
            summary: "프로젝트 댓글 등록",
            desc: "프로젝트 넘버를 기준으로 댓글을 등록"
        },
        requestBody: {
            type: ProjectReplyRegistDTO,
            examples: {

            }
        },
        responseList: []
    })
    async regist(@Param("no") no: number, @Body() dto: ProjectReplyRegistDTO): Promise<RegistResultType<ObjectType<number>>> {
        return await this.service.regist(no, dto);
    }

    @PostSwg({
        path: ":no/:replyNo",
        swagger: {
            summary: "프로젝트 댓글의 댓글 등록",
            desc: "프로젝트 넘버와 부모 댓글의 번호를 기준으로 댓글 등록"
        },
        requestBody: {
            type: ProjectReplyRegistDTO
        },
        responseList: []
    })
    async childRegist(@Param("no") no: number, @Param("replyNo") parentReplyNo: number, @Body() dto: ProjectReplyRegistDTO) {
        dto.parent = parentReplyNo;
        return await this.service.childRegist(no, dto);
    }
}

export default ProjectReplyController;