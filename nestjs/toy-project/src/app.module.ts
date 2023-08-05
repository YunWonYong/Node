import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/module";
import ProjectModule from "./project/module";
import ORMModule from "./common/orm";
import CompanyModule from "./company/module";

@Module({
    imports: [
        ConfigModule,
        ProjectModule,
        CompanyModule,
        ORMModule,
    ],
})
export class AppModule {}
