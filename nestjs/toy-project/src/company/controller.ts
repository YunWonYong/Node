import { Body, Param } from "@nestjs/common";
import { ControllerSwg, GetSwg, PostSwg, PutSwg } from "src/decorators/swagger";
import CompanyService from "./service";
import CompanyRegistDTO from "./dto/companyRegistDTO";
import CompanyReadDTO from "./dto/companyReadDTO";
import CompanyModifyDTO from "./dto/companyModifyDTO";

@ControllerSwg("company")
class CompanyController {
    constructor(private readonly service: CompanyService) {}

    @GetSwg({
        swagger: {
            summary: "회사 목록",
            desc: "회사 목록 조회"
        }
    })
    async list() {
        return this.service.list();
    }

    @PostSwg({
        swagger: {
            summary: "회사 등록",
            desc: "프로젝트를 만들 때 사용할 회사 정보 등록"
        },
        responseList: [
            {
                status: 201,
                schema: {
                    example: {
                        result: "success",
                        pk: "pk data",
                    }
                }
            }
        ]
    })
    async regist(@Body() dto: CompanyRegistDTO) {
        return await this.service.regist(dto);
    }

    @GetSwg({
        path: ":company_no",
        swagger: {
            summary: "회사 상세 정보 조회",
            desc: "등록된 회사의 상세 정보를 조회"
        },
        responseList: [
            {
                status: 200,
                type: CompanyReadDTO
            },
            {
                status: 404,
                schema: {
                    example: {
                        message: "companyNo(2) not found",
                        error: "Not Found",
                        statusCode: 404
                    }
                }
            }
        ]
    })
    async read(@Param("company_no") companyNo: number) {
        return await this.service.findOne(companyNo);
    }

    @PutSwg({
        path: ":company_no",
        swagger: {
            summary: "회사 상세 정보 수정",
            desc: "등록된 회사의 상세 정보를 수정"
        },
        responseList: [
            {
                status: 200,
                schema: {
                    example: {
                        result: "success",
                        pk: "pk data",
                        affected: 1
                    }
                }
            },
            {
                status: 404,
                schema: {
                    example: {
                        message: "companyNo(2) not found",
                        error: "Not Found",
                        statusCode: 404
                    }
                }
            }
        ]
    })
    async update(@Param("company_no") companyNo: number, @Body() dto: CompanyModifyDTO) {
        return await this.service.modify(companyNo, dto);
    }
}

export default CompanyController;