import { Inject, Injectable } from "@nestjs/common";
import Mail, { Options } from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";
import emailConfig from "src/config/email/email.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class EmailService {
   

    private transporter: Mail;
    
    constructor(@Inject(emailConfig.KEY) private readonly config: ConfigType<typeof emailConfig>) {
        const { service, auth } = this.config;
        // console.log("email service constructor", service, auth);
        this.transporter = createTransport({
            service,
            auth
        });
    }

    async sendMemberJoinVerification(email: string, signupVerifyToken: string): Promise<any> {
        const { verifyBaseUrl } = this.config;
        const url = `${verifyBaseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;
        const mailOptions: Options = {
            to: email,
            subject: "가입 인증 메일",
            html: `
                <form action="${url}" method="POST">
                    <button>
                        가입확인
                    </button>
                </form>
            `
        };

        
        return await this.transporter.sendMail(mailOptions);
    }
}
