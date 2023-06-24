import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./user/app.controller";
import { UserService } from "./user/app.service";
import { LoginService } from "./login/app.service";
import { LoginController } from "./login/app.controller";

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
    ],
})
export class AppModule {}
