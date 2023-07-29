import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common";
import SwaggerBuilder from "./common/swagger";
import ConfigService from "./config";

(async () => {

    const nestFactory: INestApplication = await NestFactory.create(AppModule);
    
    const config = nestFactory.get(ConfigService);

    SwaggerBuilder.defaultBuild(nestFactory);
    
    const appConfig = config.getAppConfig();
    await nestFactory.listen(appConfig.port);
})();
