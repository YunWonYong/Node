import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./app.service";
import { User } from "./model/User.interface";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@Controller("/users")
@ApiTags("User")
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get("/:id")
    @ApiOperation({ 
        summary: "사용자 정보 조회",
        description: "id에 해당하는 사용자 정보를 불러온다."
    })
    async getUser(@Param("id") id: string): Promise<User> {
        return this.userService.getUser(id);
    }
}