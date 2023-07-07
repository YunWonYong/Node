import { Body, Controller, Get, Post, Query, Param } from "@nestjs/common";
import { CreateUserDTO } from './dto/create-user.dto';
import { VerifyEmailDTO } from "./dto/verify-email.dto";
import { UserLoginDTO } from "./dto/user-login.dto";

@Controller("users")
export class UsersController {
    @Post()
    async createUsers(@Body() dto: CreateUserDTO): Promise<void> {
        console.log(dto);
    }

    @Post("/email-verify")
    async verifyEmail(@Query() dto: VerifyEmailDTO): Promise<string> {
        console.log(dto);
        return;
    }

    @Post("/login")
    async login(@Body() dto: UserLoginDTO): Promise<string> {
        console.log(dto);
        return;
    }

    @Get("/:id")
    async getUserInfo(@Param("id") userId: string): Promise<void> {
        console.log(userId);
    }
}