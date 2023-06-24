import { Controller, Get, Param, Body, Post } from "@nestjs/common";
import { UserService } from "./app.service";
import { User } from "./model/User.interface";
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBody } from "@nestjs/swagger";
import { UserDTO } from "./model/UserDTO";

@Controller("/users")
@ApiTags("User")
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get()
    @ApiOperation({ 
        summary: "모든 사용자 정보 조회",
        description: "모든 사용자 정보를 불러온다."
    })
    @ApiCreatedResponse({
        description: "모든 사용자의 정보 조회",
        type: [UserDTO]
    })
    async listUser(): Promise<User[]> {
        return this.userService.listUser()
    }

    @Post()
    @ApiOperation({
        summary: "사용자 정보 추가",
        description: "id에 해당하는 사용자 정보를 등록한다."
    })
    @ApiBody({
        type: UserDTO       
    })
    @ApiCreatedResponse({
        description: "성공 201, 중복 204, 실패 500"
    })
    async registerUser(@Body() dto: UserDTO) {
        return this.userService.registerUser(dto);
    }

    @Get("/:id")
    @ApiOperation({ 
        summary: "특정 사용자 정보 조회",
        description: "id에 해당하는 사용자 정보를 불러온다."
    })
    @ApiCreatedResponse({
        description: "id에 해당하는 사용자 정보가 없으면 Error",
        type: UserDTO
    })
    async getUser(@Param("id") id: string): Promise<User> {
        return this.userService.getUser(id);
    }
}