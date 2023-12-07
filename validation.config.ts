import * as Joi from 'joi';

export const validationConfig = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
