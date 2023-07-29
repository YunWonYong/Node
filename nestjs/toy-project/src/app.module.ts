import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/module";
import ProjectModule from "./project/module";
import ORMModule from "./common/orm";

@Module({
    imports: [
        ConfigModule,
        ProjectModule,
        ORMModule,
    ],
})
export class AppModule {}
