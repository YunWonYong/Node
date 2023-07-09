import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailService } from "src/email/email.service";
import { v1 as uuidV1 } from "uuid";
import { UserInfo } from "./dto/user-info.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {

    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>

    constructor(private readonly emailService: EmailService) {}

    async findAll(offset: number, limit: number): Promise<UserInfo[]> {
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
        userEntity.id = uuidV1();
        userEntity.name = name;
        userEntity.email = email;
        userEntity.password = password;
        userEntity.signupVerifyToken = signupVerifyToken;
        const saveResult = await this.usersRepository.save(userEntity);
        console.log("user save", saveResult);
        return;
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToken: string): Promise<any> {
        return await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }


    async verifyEmail(signupVerifyToken: string): Promise<string> {
        
        return signupVerifyToken;
    }


    async login(email: string, password: string): Promise<string> {
        return email;
    }

    async getUserInfo(userId: number): Promise<UserInfo> {
        return new UserInfo();
    }

    async remove(id: number): Promise<string> {
        return `This action removes a #${id} user`;
    }
}