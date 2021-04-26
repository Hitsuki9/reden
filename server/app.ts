import dotenv from 'dotenv';
import { Client } from 'pg';
import startServer from './server';
import { logger } from './lib/logger';

dotenv.config();
const client = new Client();

(async () => {
  try {
    await client.connect();
    logger.info('database connected');
    await startServer();
    logger.info(`server on ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
