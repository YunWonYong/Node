import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { GlobalLogger } from './middleware/global/functionType';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(GlobalLogger);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  await app.listen(3000);
}
bootstrap();
