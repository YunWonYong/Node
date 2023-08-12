import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/module";
import ProjectModule from "./project/module";
import ORMModule from "./common/orm";
import CompanyModule from "./company/module";
import ProjectCategoryModule from "./project_category/projectCategory.module";

@Module({
    imports: [
        ConfigModule,
        ProjectModule,
        ProjectCategoryModule,
        CompanyModule,
        ORMModule,
    ],
})
export class AppModule {}
