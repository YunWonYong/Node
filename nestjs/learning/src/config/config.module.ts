import { Module } from "@nestjs/common";
import { ConfigModule as cm } from "@nestjs/config";
import emailConfig from "./email.config";
import { validationSchema } from "./validationSchema";

enum ENV {
    LIVE = "production",
    QA = "stage",
    DEV = "development"
}

const getENVFilePath = () => {
    const root = __dirname;
    const directory = "env";
    const extension = ".env";
    let env: ENV;
    switch(process.env.NODE_ENV) {
        case ENV.LIVE:
        case ENV.QA:
        case ENV.DEV:
            env = process.env.NODE_ENV;
        break;
        default:
            throw new Error(`not supported env ${process.env.NODE_ENV}`);
         
    }
    return `${root}/${directory}/.${env}${extension}`;
}; 

const envFilePath = getENVFilePath();
const configModule = cm.forRoot({
    envFilePath,
    isGlobal: true,
    load: [
        emailConfig
    ],
    validationSchema
});

@Module({
    imports: [
        configModule
    ],
    exports: [
        configModule
    ]
})
export class ConfigModule {}