import { ConfigModule } from "@nestjs/config";
import { getENVFilePath } from "..";
import { validationSchema } from "../validationSchema";
import authConfig from "./auth.config";

const envFilePath = getENVFilePath();
const AuthModule = ConfigModule.forRoot({
    envFilePath,
    isGlobal: true,
    load: [
        authConfig
    ],
    validationSchema
});

export default AuthModule;