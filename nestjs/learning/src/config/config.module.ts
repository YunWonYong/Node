import { Module } from "@nestjs/common";
import EmailModule from "./email/email.module";
import OrmModule from "./orm/orm.module";

@Module({
    imports: [
        EmailModule,
        OrmModule
    ],
    exports: [
        EmailModule
    ]
})
export class ConfigModule {}