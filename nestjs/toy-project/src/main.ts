import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

(async () => {
    const nestFactory = await NestFactory.create(AppModule);
    await nestFactory.listen(3001);
})();
