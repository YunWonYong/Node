import { Injectable } from "@nestjs/common";
import { DuplicateException, EmptyException, NotFoundException, hasValue, isUndefined } from "src/util/Error";
import { UserDTO, UserInfoDTO } from "./model/UserDTO";
import { GRADE, JOB } from "./model/Protocol";

type UserInfoType = {
    [key in string]: UserDTO
};

const USER_TABLE: UserInfoType = {
    "ywyi1992": { 
        id: "ywyi1992",
        password: "123",
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
class UserService {
    
    listUser(): Promise<UserDTO[]> {
        return new Promise((resolve, reject) => {
            if (hasValue(USER_TABLE)) {
                resolve(Object.keys(USER_TABLE).map(id => USER_TABLE[id]));
                return
            }
            
            reject(new EmptyException("user list"));
        });      
    }

    registerUser(dto: UserDTO): Promise<string> {
    return new Promise((resolve, reject) => {
            const { id } = dto;
            this.getUser(id)
                .then((user: UserDTO) => {
                    reject(new DuplicateException(`${user.id}`));
                })
                .catch(() => {
                    resolve("ok");
                    USER_TABLE[id] = dto;
                });
        });
    }

    getUser(id: string): Promise<UserDTO> {
        return new Promise((resolve, reject) => {
            const user = USER_TABLE[id];
            if (isUndefined(user)) {
                reject(new NotFoundException(`user ${id}`));
                return;
            }
            resolve(user);
        });
    }

    modifyUser(id: string, dto: UserInfoDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            this.getUser(id)
                .then((user: UserDTO) => {
                    USER_TABLE[id] = {
                        id,
                        password: user.password,
                        info: {
                            ...dto
                        }
                    };
                    resolve("ok");
                })
                .catch(reject);
        });
    }

    destroyUser(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.getUser(id)
                .then((user: UserDTO) => {
                    delete USER_TABLE[user.id];
                    resolve("ok");
                })
                .catch(reject);
            
        });
    }
}


export {
    UserService,
    USER_TABLE
}