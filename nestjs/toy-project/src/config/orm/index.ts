import { getSourceDirectoryPath } from "../";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist";

type support_db = "mysql" | "oracle" | "mariadb" | "postgres";

const ORMConfig = () => {
    const type = (process.env.DB_TYPE || "oracle") as support_db;
    const host = process.env.DB_HOST || "";
    const port = parseInt(process.env.DB_PORT || "0");
    const username = process.env.DB_USERNAME || "";
    const password = process.env.DB_PASSWORD || "";
    const synchronize = process.env.DB_SYNCHRONIZE === "true";
    const database = process.env.DB_NAME || "";
    const entities = [
        `${getSourceDirectoryPath()}\\**\\entities\\*.ts`,
    ];

    const orm: TypeOrmModuleOptions = {
        type,
        host,
        port,
        username,
        password,
        synchronize,
        database,
        entities
        
    };
    return {
        orm
    };
};

export default ORMConfig;