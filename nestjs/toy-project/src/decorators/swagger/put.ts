import { applyDecorators } from "@nestjs/common";
import { Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiResponseOptions } from "@nestjs/swagger";

type PostParam = {
    path?: string,
    swagger: {
        summary: string,
        desc: string,    
    },
    paths?: string[],
    responseList: ApiResponseOptions[]
}

const PutSwg = (param: PostParam) => {
    const { path, swagger: { summary, desc }, responseList } = param;
    const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] = [
        Put(path),
        ApiOperation({
            summary,
            description: desc,
            parameters: [
                {
                    name: "company_no",
                    in: "path",
                    example: 1 
                }
            ]
        })
    ];

    if (responseList && Array.isArray(responseList)) {
        responseList.forEach(option => decorators.push(ApiResponse(option)));
    }
    return applyDecorators(...decorators);
};

export {
    PutSwg,
}