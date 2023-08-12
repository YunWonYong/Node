import { ControllerSwg, GetSwg, PostSwg } from "src/decorators/swagger";
import { Body } from "@nestjs/common";
import ProjectCategoryService from "./projectCategory.service";
import { ProjectCategoryListDTO, ProjectCategoryRegistDTO } from "./dto";
import { ListResult } from "src/common/types";

@ControllerSwg("project-catetory")
class ProjectCategoryController {
    constructor(private readonly service: ProjectCategoryService) {}
    
    @GetSwg({
        swagger: {
            summary: "프로젝트 카테고리 목록 조회",
            desc: "생성된 프로젝트 카테고리 전체 조회"
        }
    })
    async categoryList(): Promise<ListResult<ProjectCategoryListDTO>> {
        return await this.service.list();
    }
    
    @PostSwg({
        swagger: {
            summary: "프로젝트 카테고리 목록 추가",
            desc: "카테고리 코드는 중복 X"
        },
        responseList: [
            {
                status: 201,
                description: "카테고리 코드를 생성한 결과",
                schema: {
                    example: {
                        result: "success or fail"
                    }
                }
            },
            {
                status: 403,
                description: "카테고리 코드를 생성 시도 시 중복된 코드 사용",
                schema: {
                    example: {
                        message: "100 duplicate",
                        error: "Forbidden",
                        statusCode: 403
                    }
                }
            }
        ]
    })
    async categoryRegist(@Body() categoryDTO: ProjectCategoryRegistDTO) {
        return {
            result: await this.service.regist(categoryDTO)
        };
    }
}

export default ProjectCategoryController;