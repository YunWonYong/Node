import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { LoggerMiddleware } from './middleware/log/Logger';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/authGuard';

@Module({
  	imports: [
    	ConfigModule,
    	UsersModule
  	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	]
})
export class AppModule implements NestModule {
  	configure(consumer: MiddlewareConsumer) {
    	consumer
      	.apply(LoggerMiddleware)
		.forRoutes("/users")
  	}
}
