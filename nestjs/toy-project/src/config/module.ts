import { Module } from "@nestjs/common";
import { ConfigModule as cm } from "@nestjs/config";
import ApplicationConfig from "./application";
import ConfigService from ".";
import SwaggerConfig from "./swagger";
import ORMConfig from "./orm";

const configModule = cm.forRoot({
    envFilePath: `${__dirname}/.env`,
    isGlobal: true,
    load: [
        ApplicationConfig,
        SwaggerConfig,
        ORMConfig, // [TODO] 사용할 수 있는 방법 생각해보기
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