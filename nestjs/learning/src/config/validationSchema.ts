import * as Joi from "joi";

export const validationSchema = Joi.object({
    EMAIL_SERVICE: Joi.string().required(),
    EMAIL_AUTH_USER: Joi.string().required(),
    EMAIL_AUTH_PASS: Joi.string().required(),
    EMAIL_VERIFY_BASE_URL: Joi.string().required(),
    
    DB_NAME: Joi.string().required(),
    DB_TYPE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_SYNCHRONIZE: Joi.boolean().required(),
});