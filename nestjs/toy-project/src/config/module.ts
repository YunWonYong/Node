import { Module } from "@nestjs/common";
import { ConfigModule as cm } from "@nestjs/config";
import ApplicationConfig from "./application";
import ConfigService from ".";

const configModule = cm.forRoot({
    envFilePath: `${__dirname}/.env`,
    isGlobal: true,
    load: [
        ApplicationConfig,
    ]
});


@Module({
    imports: [
        configModule
    ],
    providers: [
        ConfigService
    ]
})
export class ConfigModule {}