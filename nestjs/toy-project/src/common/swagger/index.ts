import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerConfig } from "src/config";
class SwaggerDocumentBuilder {
    private readonly config: SwaggerConfig;

    constructor(config: SwaggerConfig) {
        this.config = config;
    }

    public build(app: INestApplication, env: string) {
        // [TODO] env가 live이면 어떻게....??
        const options = new DocumentBuilder()
                        .setTitle(this.config.title)
                        .setDescription(this.config.description)
                        .setVersion(this.config.version)
                        .addServer(this.config.server)
                        .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(this.config.path, app, document);
    }
} 


export default SwaggerDocumentBuilder;