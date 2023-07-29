import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/module";
import ProjectModule from "./project/module";
import { getORMModule } from "./common/orm";

@Module({
    imports: [
        ConfigModule,
        ProjectModule,
        getORMModule()
    ],
    controllers: [
    ],
    providers: [
    ],
})
export class AppModule {}
