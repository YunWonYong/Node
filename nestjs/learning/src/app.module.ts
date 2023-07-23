import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { LoggerMiddleware } from './middleware/log/Logger';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './guard/authGuard';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@Module({
  	imports: [
    	ConfigModule,
    	UsersModule,
		ProjectModule,
		AuthModule, // AuthGuard에서 사용하려면 여기에 import 해야함.
  	],
	// providers: [
	// 	{
	// 		provide: APP_GUARD,
	// 		useClass: AuthGuard,
	// 	}
	// ]
})
export class AppModule implements NestModule {
  	configure(consumer: MiddlewareConsumer) {
    	consumer
      	.apply(LoggerMiddleware)
		.forRoutes("/users")
  	}
}
