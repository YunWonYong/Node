import { Controller, Post } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { LoginService } from "./app.service";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { LoginDTO } from "./model/LoginDTO";

@Controller("/login")
@ApiTags("Login")
export class LoginController {
    private readonly loginService: LoginService;

    constructor(logService: LoginService) {
        this.loginService = logService;
    }
    
    @Post()
    @ApiBody({
        type: LoginDTO
    })
    async login(@Body() dto: LoginDTO) {
        return this.loginService.login(dto);
    }
}