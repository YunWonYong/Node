import { registerAs } from "@nestjs/config";

type support_db = "mysql" | "oracle" | "mariadb" | "postgres";
export const ormENVInfo = {
    dbType: process.env.DB_TYPE as support_db,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: parseInt((process.env.DB_PORT || "0")),
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbSynchronize: process.env.DB_SYNCHRONIZE === "true",
}; 

export default registerAs("orm", () => {
    return ormENVInfo;
});