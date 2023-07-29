import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common";
import SwaggerBuilder from "./common/swagger";

(async () => {
    const nestFactory: INestApplication = await NestFactory.create(AppModule);
    
    SwaggerBuilder.defaultBuild(nestFactory);

    await nestFactory.listen(3001);
})();
