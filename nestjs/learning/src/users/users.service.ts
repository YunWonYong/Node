import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    remove(id: string) {
        return `This action removes a #${id} user`;
    }
}