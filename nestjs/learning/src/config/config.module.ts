import { Module } from "@nestjs/common";
import EmailModule from "./email/email.module";
import OrmModule from "./orm/orm.module";
import AuthModule from "./auth/auth.module";

@Module({
    imports: [
        EmailModule,
        OrmModule,
        AuthModule
    ],
    exports: [
        EmailModule,
        OrmModule,
        AuthModule
    ]
})
export class ConfigModule {}