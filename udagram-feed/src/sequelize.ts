import { Sequelize } from 'sequelize-typescript';
import { config } from './config/config';

export const sequelize = new Sequelize({
  username: config.dev.username,
  password: config.dev.password,
  database: config.dev.database,
  host: config.dev.host,

  dialect: config.dev.dialect,
  storage: ':memory:',
});
