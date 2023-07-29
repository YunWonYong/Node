import { Injectable } from "@nestjs/common";
import { ConfigService as CS } from "@nestjs/config";

type AppConfig = {
    env: string,
    port: number
};

export type SwaggerConfig = {
    title: string,
    description: string,
    path: string,
    version: string,
    server: string
}

@Injectable()
class ConfigService {
    constructor(private readonly config: CS ) {}

    public getAppConfig(): AppConfig {
        return this.get("app"); 
    }

    public getSwaggerConfig(): SwaggerConfig {
        return this.get("swagger");
    }

    private get(id: string) {
        const config = this.config.get(id);
        if (config === undefined) {
            throw new Error(`${id} config not found`);
        }
        return config;
    }
}

export default ConfigService;