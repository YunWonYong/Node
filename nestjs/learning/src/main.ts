import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { GlobalLogger } from './middleware/global/functionType';
// import { AuthGuard } from './guard/authGuard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(GlobalLogger);
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  await app.listen(3001);
}
bootstrap();
