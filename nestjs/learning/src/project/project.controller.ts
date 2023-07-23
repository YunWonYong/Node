import { Controller, Param,  } from "@nestjs/common";
import { Get, Post, Delete, Put, } from "@nestjs/common";
import { ProjectService } from "./project.service";

@Controller("project")
export class ProjectController {

    constructor(private readonly service: ProjectService) {}

    @Get("/:offset/:limit")
    async findAll(@Param("offset") offset: number, @Param("limit") limit: number) {
        console.log(offset, limit);
        return this.service.findAll(offset, limit);
    }

    @Post()
    async regist() {
        return
    }

    @Put()
    async modify() {
        return
    }

    @Delete()
    async destroy() {
        return
    }
    
}