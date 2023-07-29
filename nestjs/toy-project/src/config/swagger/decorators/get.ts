import { applyDecorators } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

type GetParam = {
    path?: string,
    swagger: {
        summary: string,
        desc: string,    
    },
    paths?: string[]
}

const GetSwg = (param: GetParam) => {
    const swagger = param.swagger;
    return applyDecorators(
        Get(param.path),
        ApiOperation({
            summary: swagger.summary,
            description: swagger.desc,
        }),
    );
};

export {
    GetSwg,
}