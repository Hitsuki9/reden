import dotenv from 'dotenv';
import { Client } from 'pg';
import { log } from './utils';

dotenv.config();
const client = new Client();

(async () => {
  try {
    await client.connect();
    log('database connected');
    const res = await client.query(`SELECT NOW()`);
    log(res.rows);
  } catch (err) {}
})();
