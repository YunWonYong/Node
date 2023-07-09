import { getSourceDirectoryPath } from "..";
import { validationSchema } from "../validationSchema";
import { ormENVInfo } from "./orm.config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

const ormOptions: TypeOrmModuleOptions = {
    type: ormENVInfo.dbType,
    host: ormENVInfo.dbHost,
    port: ormENVInfo.dbPort,
    username: ormENVInfo.dbUserName,
    password: ormENVInfo.dbPassword,
    database: ormENVInfo.dbName,
    entities: [
        `${getSourceDirectoryPath()}/**/*.entity{.ts,.js}`
    ],
    synchronize: ormENVInfo.dbSynchronize,
    validateOptions: {
        validationSchema
    }
};

const OrmModule = TypeOrmModule.forRoot(ormOptions); 

export default OrmModule;