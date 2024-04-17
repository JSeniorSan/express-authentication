import express from 'express';
import { login, register } from '../controllers/authentication.js';
import { createAuthValidationSchema } from '../utils/validationSchemas.js';
import { checkSchema } from 'express-validator';

export default (router: express.Router) => {
  router.post('/auth/register', checkSchema(createAuthValidationSchema), register);
  router.post('/auth/login', checkSchema(createAuthValidationSchema), login);
};
