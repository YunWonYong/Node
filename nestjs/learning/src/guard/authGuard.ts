import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("auth guard");
        // console.log(context);
        const http: HttpArgumentsHost = context.switchToHttp();
        const request = http.getRequest<Request>();
        return this.validateRequest(request);
    }

    private async validateRequest(request: Request): Promise<boolean> {
        // console.log(request);
        return true;
    }
}