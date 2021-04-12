import dotenv from 'dotenv';
import { Client } from 'pg';
import server from './server';

dotenv.config();
const client = new Client();

(async () => {
  try {
    await client.connect();
    console.log('database connected');
    server.listen(9000, () => {
      console.log('server on 9000');
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
