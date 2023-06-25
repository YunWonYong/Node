import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./user/app.controller";
import { UserService } from "./user/app.service";
import { LoginService } from "./login/app.service";
import { LoginController } from "./login/app.controller";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionFilter } from "./modules/filters/GlobalFilter";

@Module({
    imports: [],
    controllers: [
        AppController,
        UserController,
        LoginController,
    ],
    providers: [
        AppService,
        UserService,
        LoginService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter
        }
    ],
})
export class AppModule {}
