import ORMConfig from "../../config/orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Module } from "@nestjs/common";

const getORMModule = () => {
    const config = ORMConfig();
    return TypeOrmModule.forRoot({
        ...config.orm,
        namingStrategy: new SnakeNamingStrategy()
    });
};

const ormModule = getORMModule();


@Module({
    imports: [
        ormModule,
    ],
    exports: [
        ormModule
    ]
})
export default class ORMModule {}