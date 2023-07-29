import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
class SwaggerDocumentBuilder {
    private readonly builder: DocumentBuilder;

    constructor() {
        this.builder = new DocumentBuilder();
    }

    public defaultBuild(app: INestApplication, env = "dev", path = "swagger") {
        this.builder.setTitle("toy_project")
                    .setDescription("toy_project rest api document")
                    .setVersion("1.0.0");
        this.build(app, env, path);
    }

    public title(title: string) {
        this.builder.setTitle(title);
        return this;
    }

    public description(description: string) {
        this.builder.setDescription(description);
        return this;
    }

    public version(version: string) {
        this.builder.setVersion(version);
        return this;
    }


    public build(app: INestApplication, env: string, path = "swagger") {
        // [TODO] env가 live이면 어떻게....??
        const options = this.builder.build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(path, app, document);
    }
} 

const SwaggerBuilder = new SwaggerDocumentBuilder();

export default SwaggerBuilder;