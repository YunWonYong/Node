import ORMConfig from "../../config/orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const getORMModule = () => {
    const config = ORMConfig();
    return TypeOrmModule.forRoot({
        ...config.orm,
        namingStrategy: new SnakeNamingStrategy()
    });
};

export {
    getORMModule
};