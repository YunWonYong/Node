import { applyDecorators } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { ApiOperation, ApiBody, ApiBodyOptions, ApiResponse, ApiResponseOptions } from "@nestjs/swagger";

type PostParam = {
    path?: string,
    swagger: {
        summary: string,
        desc: string,    
    },
    requestBody?: ApiBodyOptions,
    paths?: string[],
    responseList: ApiResponseOptions[]
}

const PostSwg = (param: PostParam) => {
    const { path, swagger: { summary, desc }, responseList, requestBody } = param;
    const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] = [
        Post(path),
        ApiOperation({
            summary,
            description: desc
        }),
    ];

    if (responseList && Array.isArray(responseList)) {
        responseList.forEach(option => decorators.push(ApiResponse(option)));
    }

    if (requestBody) {
        decorators.push(ApiBody(requestBody))
    }

    return applyDecorators(...decorators);
};

export {
    PostSwg,
}