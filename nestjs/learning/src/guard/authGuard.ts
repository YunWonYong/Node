import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request } from "express";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("auth guard");
        // console.log(context);
        const http: HttpArgumentsHost = context.switchToHttp();
        const request = http.getRequest<Request>();
        return this.validateRequest(request);
    }

    private async validateRequest(request: Request): Promise<boolean> {
        try {
            const { headers } = request;
            console.log(headers);
            const { authorization } = headers;
            if (authorization === undefined) {
                throw new NotFoundException("authorization not found");
            }
            console.log(authorization);
            const tokens = authorization.split(" ");
            if (tokens.length !== 2) {
                throw new UnauthorizedException(authorization);
            }
            const user = this.authService.verify(tokens[1]);

            if (user === null) {
                throw new UnauthorizedException();
            }

            return true;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }
}