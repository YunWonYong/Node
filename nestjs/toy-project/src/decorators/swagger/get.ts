import { applyDecorators } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiResponseOptions } from "@nestjs/swagger";

type GetParam = {
    path?: string,
    swagger: {
        summary: string,
        desc: string,    
    },
    paths?: string[],
    responseList?: ApiResponseOptions[]
}

const GetSwg = (param: GetParam) => {
    const { path, swagger: { summary, desc }, responseList } = param;
    const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] = [
        Get(path),
        ApiOperation({
            summary,
            description: desc,
        }),
    ];

    if (responseList && Array.isArray(responseList)) {
        responseList.forEach(option => {
            decorators.push(ApiResponse(option));
        })
    }
    return applyDecorators(...decorators);
};

export {
    GetSwg,
}