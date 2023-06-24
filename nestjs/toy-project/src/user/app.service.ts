import { Injectable } from "@nestjs/common";
import { hasValue, isUndefined } from "src/util/Error";
import { UserDTO, UserInfoDTO } from "./model/UserDTO";
import { GRADE, JOB } from "./model/Protocol";

type UserInfoType = {
    [key in string]: UserDTO
};

const USER_TABLE: UserInfoType = {
    "ywyi1992": { 
        id: "ywyi1992",
        info: {
            nickName: "cat",
            age: 32,
            email: "ywyi1992@gmail.com",
            grade: GRADE.USER,
            job: JOB.SERVER_DEVELOPER
        }
    }
};

@Injectable()
export class UserService {
    
    listUser(): Promise<UserDTO[]> {
        return new Promise((resolve, reject) => {
            if (hasValue(USER_TABLE)) {
                resolve(Object.keys(USER_TABLE).map(id => USER_TABLE[id]));
                return
            }
            
            reject(new Error("user empty"));
        });      
    }

    registerUser(dto: UserDTO): Promise<string> {
    return new Promise((resolve, reject) => {
            const { id } = dto;
            const user = USER_TABLE[id];
            if (hasValue(user)) {
                reject(new Error(`user ${id} duplicated`));
                return;
            }

            USER_TABLE[id] = dto;
            resolve("ok");
        });
    }

    getUser(id: string): Promise<UserDTO> {
        return new Promise((resolve, reject) => {
            const user = USER_TABLE[id];
            if (isUndefined(user)) {
                reject(new Error(`user ${id} not found`));
                return;
            }
            resolve(user);
        });
    }

    modifyUser(id: string, dto: UserInfoDTO) {
        return new Promise((resolve, reject) => {
            const user = USER_TABLE[id];
            if (isUndefined(user)) {
                reject(new Error(`user ${id} not found`));
                return;
            }

            USER_TABLE[id] = {
                id,
                info: {
                    ...dto
                }
            };
            resolve("ok")
        });
    }
}
