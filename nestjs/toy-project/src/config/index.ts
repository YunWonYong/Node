import { Injectable } from "@nestjs/common";
import { ConfigService as CS } from "@nestjs/config";

type AppConfig = {
    env: string,
    port: number
};

@Injectable()
class ConfigService {
    constructor(private readonly config: CS ) {}

    public getAppConfig(): AppConfig {
        return this.get("app"); 
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