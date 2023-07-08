import { Injectable } from "@nestjs/common";
import { EmailService } from "src/email/email.service";
import { v1 as uuidV1 } from "uuid";
import { UserInfo } from "./dto/user-info.dto";

@Injectable()
export class UsersService {

    constructor(private readonly emailService: EmailService) {}

    async findAll(offset: number, limit: number): Promise<UserInfo[]> {
        return [];
    }
    async createUser(name: string, email: string, password: string): Promise<void> {
        const checkFlag = await this.checkUserExists(email);
        console.log("user Exists", checkFlag);

        const signupVerifyToken = uuidV1();

        await this.saveUser(name, email, password, signupVerifyToken);
        const emailSendResult = await this.sendMemberJoinEmail(email, signupVerifyToken);
        console.log("email send result: ", emailSendResult);
    }

    private async checkUserExists(email: string): Promise<boolean> {
        return false;
    }

    private async saveUser(name: string, email: string, password: string, token: string): Promise<void> {
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