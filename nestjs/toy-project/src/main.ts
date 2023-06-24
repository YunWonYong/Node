import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common";
import swaggerInit from "./modules/swagger";
import { errorPrint, getError } from "./util/Error";

const port = 3000;

(() => {
    NestFactory
    .create(AppModule)
    .then((app: INestApplication<any>) => {
        const initCommandList: string[] = [];
        const swaggerInitResult = swaggerInit(app);
        initCommandList.push(`swagger init: ${swaggerInitResult}`)
        app
        .listen(port)
        .then(() => {
            console.log(initCommandList.join("\n"));
        })
        .catch((e) => {
            const err = getError(e);
            errorPrint("NestJS Server Initialized", err, `${port} listen fail!!!`);
            throw err;
        })
    })
    .catch(e => {
        const err = getError(e);
        errorPrint("NestJS Server Initialized", err, `NestFactory create Module fail!!!`);
        throw err;
    });
})();
