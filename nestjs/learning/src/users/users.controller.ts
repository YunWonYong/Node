import { Controller } from "@nestjs/common";
import { Body, Query, Param } from "@nestjs/common";
import { Get, Post, Delete } from "@nestjs/common";
import { CreateUserDTO } from './dto/create-user.dto';
import { VerifyEmailDTO } from "./dto/verify-email.dto";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UsersService } from "./users.service";
import { UserInfo } from "./dto/user-info.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUsers(@Body() dto: CreateUserDTO): Promise<void> {
        const { name, email, password} = dto;
        await this.usersService.createUser(name, email, password)
    }

    @Post("/email-verify")
    async verifyEmail(@Query() dto: VerifyEmailDTO): Promise<string> {
        const { signupVerifyToken } = dto;
        return await this.usersService.verifyEmail(signupVerifyToken);
    }

    @Post("/login")
    async login(@Body() dto: UserLoginDTO): Promise<string> {
        const { email, password } = dto;
        return await this.usersService.login(email, password);
    }

    @Get("/:id")
    async getUserInfo(@Param("id") userId: string): Promise<UserInfo> {
        return await this.usersService.getUserInfo(userId);
    }

    @Delete("/:id")
    async removeUser(@Param("id") userId: string): Promise<string> {
        return this.usersService.remove(userId);
    }
}