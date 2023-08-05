import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CompanyController from "./controller";
import CompanyService from "./service";
import { CompanyEntity } from "./entities/company";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CompanyEntity
        ])
    ],
    controllers: [
        CompanyController
    ],
    providers: [
        CompanyService
    ]
})
export default class CompanyModule {}