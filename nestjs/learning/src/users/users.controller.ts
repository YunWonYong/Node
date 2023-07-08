import { Controller } from "@nestjs/common";
import { Body, Query, Param } from "@nestjs/common";
import { Get, Post, Delete } from "@nestjs/common";
import { ParseIntPipe, DefaultValuePipe } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { CreateUserDTO } from './dto/create-user.dto';
import { VerifyEmailDTO } from "./dto/verify-email.dto";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UsersService } from "./users.service";
import { UserInfo } from "./dto/user-info.dto";
import { CustomValidationPipe } from "./pipe/validation.pipe";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(
        @Query("offset", new DefaultValuePipe(0), ParseIntPipe) offset: number, 
        @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number
    ): Promise<UserInfo[]> {
        return await this.usersService.findAll(offset, limit);
    }

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
    async getUserInfo(@Param("id", new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) userId: number): Promise<UserInfo> {
        return await this.usersService.getUserInfo(userId);
    }

    @Delete("/:id")
    async removeUser(@Param("id", CustomValidationPipe) userId: number): Promise<string> {
        return this.usersService.remove(userId);
    }
}