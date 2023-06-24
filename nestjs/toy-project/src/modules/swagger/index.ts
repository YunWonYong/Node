import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { errorPrint } from "src/util/Error";
const swaggerInit = (app: INestApplication<any>) => {
    try {
        const options = new DocumentBuilder()
        .setTitle("nestjs toy project api document")
        .setDescription("hello world!!!")
        .setVersion("1.0.0")
        .build();
    
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup("swagger/api", app, document);    
    } catch(e) {
        errorPrint("swaggerInit", e)
        return false;
    }
    return true;
};


export default swaggerInit;