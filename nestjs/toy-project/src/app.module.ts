import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/module";
import ProjectModule from "./project/project.module";
import ORMModule from "./common/orm";
import CompanyModule from "./company/company.module";
import ProjectCategoryModule from "./project_category/projectCategory.module";
import ProjectImgModule from "./project_img/projectImg.module";
import ProjectReplyModule from "./project_reply/projectReply.module";

@Module({
    imports: [
        ConfigModule,
        ProjectModule,
        ProjectCategoryModule,
        ProjectImgModule,
        ProjectReplyModule,
        CompanyModule,
        ORMModule,
    ]
})
export class AppModule {}
