const SwaggerConfig = () => {
    return {
        swagger: {
            title: process.env.SWAGGER_TITLE,
            description: process.env.SWAGGER_DESCRIPTION,
            path: process.env.SWAGGER_PATH,
            version: process.env.SWAGGER_VERSION,
            server: process.env.SWAGGER_SERVER
        }
    };
};
export default SwaggerConfig;
