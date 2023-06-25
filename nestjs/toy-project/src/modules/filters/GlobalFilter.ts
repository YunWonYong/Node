import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { getCustomException, isCustomError } from "src/util/Error";


type ErrorBody = {
    statusCode: number,
    message: string
};

@Catch()
class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx  = host.switchToHttp();
        
        const error: ErrorBody = {
            statusCode: 500,
            message: "not supported Exception type"
        };

        if (exception instanceof HttpException) {
            error.statusCode = exception.getStatus();
            error.message = exception.message;
        } else {
            const err = getCustomException(exception);
            error.statusCode = err.getStatusCode();
            error.message = err.getMessage();
        }
        
        const req = ctx.getRequest();
        const responseBody = {
            error,
            timestemp: new Date().toISOString(),
            method: httpAdapter.getRequestMethod(req),
            path: httpAdapter.getRequestUrl(req)
        };  

        httpAdapter.reply(ctx.getResponse(), responseBody, error.statusCode);
    }
}

export {
    AllExceptionFilter
};