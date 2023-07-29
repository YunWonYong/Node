import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/module";
import ProjectModule from "./project/module";

@Module({
    imports: [
        ConfigModule,
        ProjectModule
    ],
    controllers: [
    ],
    providers: [
    ],
})
export class AppModule {}
