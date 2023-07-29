const ApplicationConfig = () => {
    return {
        app: {
            env: process.env.APP_ENVIRONMENT || "dev",
            port: parseInt(process.env.APP_PORT || "3001")
        }
    };
};
export default ApplicationConfig;
