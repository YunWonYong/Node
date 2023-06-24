import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export const swaggerSpecs = YAML.load(
  path.join(path.resolve(), "./config/swagger.yaml")
);

export const swaggerUI = swaggerUi;