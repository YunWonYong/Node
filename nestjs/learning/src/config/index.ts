enum ENV {
    LIVE = "production",
    QA = "stage",
    DEV = "development"
}

const getSourceDirectoryPath = () => {
    const paths = __dirname.split("\\");
    paths.pop();
    return paths.join("\\");
};

const getConfigDirectoryPath = () => __dirname;
const getEnvDirectoryPath = () => `${__dirname}/env`;

const getENVFilePath = () => {
    const envDirectoryPath = getEnvDirectoryPath();
    const extension = ".env";
    let env: ENV;
    switch(process.env.NODE_ENV) {
        case ENV.LIVE:
        case ENV.QA:
        case ENV.DEV:
            env = process.env.NODE_ENV;
        break;
        default:
            throw new Error(`not supported env ${process.env.NODE_ENV}`);
         
    }
    return `${envDirectoryPath}/.${env}${extension}`;
}; 


export {
    ENV,
    getSourceDirectoryPath,
    getConfigDirectoryPath,
    getEnvDirectoryPath,
    getENVFilePath
};