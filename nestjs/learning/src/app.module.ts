import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { LoggerMiddleware } from './middleware/log/Logger';

@Module({
  	imports: [
    	ConfigModule,
    	UsersModule
  	]
})
export class AppModule implements NestModule {
  	configure(consumer: MiddlewareConsumer) {
    	consumer
      	.apply(LoggerMiddleware)
		.forRoutes("/users")
  	}
}
