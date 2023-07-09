import { ConfigModule } from "@nestjs/config";
import { getENVFilePath } from "../";
import { validationSchema } from "../validationSchema";
import emailConfig from "./email.config";

const envFilePath = getENVFilePath();
const EmailModule = ConfigModule.forRoot({
    envFilePath,
    isGlobal: true,
    load: [
        emailConfig
    ],
    validationSchema
});

export default EmailModule;