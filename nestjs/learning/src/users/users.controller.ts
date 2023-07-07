import { Controller } from "@nestjs/common";
import { Body, Query, Param } from "@nestjs/common";
import { Get, Post, Delete } from "@nestjs/common";
import { CreateUserDTO } from './dto/create-user.dto';
import { VerifyEmailDTO } from "./dto/verify-email.dto";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

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

    @Delete("/:id")
    async removeUser(@Param("id") userId: string): Promise<string> {
        return this.usersService.remove(userId);
    }
}