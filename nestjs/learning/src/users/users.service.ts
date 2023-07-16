import { Injectable, UnprocessableEntityException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailService } from "src/email/email.service";
import { v1 as uuidV1, v4 as uuidV4 } from "uuid";
import { UserInfo } from "./dto/user-info.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UsersService {

    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
    constructor(private readonly emailService: EmailService, private readonly authService: AuthService) {}

    async findAll(offset: number, limit: number): Promise<UserInfo[]> {
        console.log(offset, limit);
        return [];
    }
    async createUser(name: string, email: string, password: string): Promise<void> {
        const checkFlag = await this.checkUserExists(email);

        if (checkFlag) {
            throw new UnprocessableEntityException("해당 이메일로는 가입할 수 없습니다.");
        }

        const signupVerifyToken = uuidV1();

        await this.saveUser(name, email, password, signupVerifyToken);
        const emailSendResult = await this.sendMemberJoinEmail(email, signupVerifyToken);
        console.log("email send result: ", emailSendResult);
    }

    private async checkUserExists(email: string): Promise<boolean> {
        const findOneResult = await this.usersRepository.findOne({
            where: {
                email
            }
        });

        console.log("findOneResult", findOneResult);
        return findOneResult instanceof UserEntity;
    }

    private async saveUser(name: string, email: string, password: string, signupVerifyToken: string): Promise<void> {
        const userEntity = new UserEntity();
        userEntity.id = uuidV4();
        userEntity.name = name;
        userEntity.email = email;
        userEntity.password = password;
        userEntity.signupVerifyToken = signupVerifyToken;
        // console.log("save user Entity", userEntity);
        const saveResult = await this.usersRepository.save(userEntity);
        console.log("user save result", saveResult);
        return;
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToken: string): Promise<any> {
        return await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }


    async verifyEmail(signupVerifyToken: string): Promise<string> {
        const user = await this.usersRepository.findOne({
            where: {
                signupVerifyToken
            }
        });

        if (user === null) {
            throw new NotFoundException("signupVerifyToken으로 조회한 유저가 없음");
        }
        
        const { id, name, email } = user;
        return this.authService.login({ id, name, email });
    }


    async login(email: string, password: string): Promise<string> {
        const user = await this.usersRepository.findOne({
            where: {
                email,
                password
            }
        });

        if (user === null) {
            throw new NotFoundException("signupVerifyToken으로 조회한 유저가 없음");
        }
        
        const { id, name } = user;
        return this.authService.login({ id, name, email });
    }

    async getUserInfo(userId: string): Promise<UserInfo> {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });

        if (user === null) {
            throw new NotFoundException("userId 조회한 유저가 없음");
        }
        return user;
    }

    async remove(id: number): Promise<string> {
        return `This action removes a #${id} user`;
    }
}