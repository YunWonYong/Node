import { Injectable } from "@nestjs/common";
import { hasValue, isUndefined } from "src/util/Error";
import { LoginDTO } from "./model/LoginDTO";
import { USER_TABLE } from "src/user/app.service";

@Injectable()
export class LoginService {

    login(dto: LoginDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            const { id, password } = dto;
            const user = USER_TABLE[dto.id];
            
            if (isUndefined(user)) {
                reject(new Error(`user ${id} not found`));
                return;
            }

            if (user.password !== password) {
                reject(new Error(`user ${id} password mismatch`));
                return;
            }

            
            resolve("login");
        }); 
    }
}
