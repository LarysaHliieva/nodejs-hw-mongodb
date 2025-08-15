import * as fs from 'node:fs';
import path from 'node:path';

import cors from 'cors';
import express from 'express';
// import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import { getEnvVar } from './utils/getEnvVar.js';

import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT')) || 3000;

const SWAGGER_DOCUMENT = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json'), 'utf-8'),
);

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCUMENT));

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server is running on ${PORT}`);
  });
}
