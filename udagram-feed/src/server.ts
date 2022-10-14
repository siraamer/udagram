import cors from 'cors';
import express from 'express';
import { sequelize } from './sequelize';

import { IndexRouter } from './controllers/v0/index.router';

import { config } from './config/config';
import { V0_FEED_MODELS } from './controllers/v0/model.index';

(async () => {
  await sequelize.addModels(V0_FEED_MODELS);

  console.debug('Initialize database connection....');

  const app = express();
  const port = process.env.PORT || 8080;
  app.set('trust proxy', true);
  app.use(express.json());

  app.use(
    cors({
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
      ],
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      preflightContinue: true,
      origin: '*',
    })
  );

  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get('/', async (req, res) => {
    res.send('/api/v0/');
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running ${config.dev.url}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
