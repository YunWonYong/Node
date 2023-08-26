import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common";
import ConfigService from "./config";
import SwaggerDocumentBuilder from "./common/swagger";

(async () => {
    const nestFactory: INestApplication = await NestFactory.create(AppModule);
    
    const config = nestFactory.get(ConfigService);
    const appConfig = config.getAppConfig();

    const swaggerConfig = config.getSwaggerConfig();

    new SwaggerDocumentBuilder(swaggerConfig).build(nestFactory, appConfig.env);
    nestFactory.enableCors({
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        origin: true,
        credentials: true
    });
    await nestFactory.listen(appConfig.port);
})();
