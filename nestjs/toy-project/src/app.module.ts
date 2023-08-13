import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/module";
import ProjectModule from "./project/project.module";
import ORMModule from "./common/orm";
import CompanyModule from "./company/company.module";
import ProjectCategoryModule from "./project_category/projectCategory.module";
import ProjectImgModule from "./project_img/projectImg.module";

@Module({
    imports: [
        ConfigModule,
        ProjectModule,
        ProjectCategoryModule,
        ProjectImgModule,
        CompanyModule,
        ORMModule,
    ],
})
export class AppModule {}
