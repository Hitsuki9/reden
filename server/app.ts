import dotenv from 'dotenv';
import startServer from './server';

dotenv.config();

(async () => {
  try {
    await startServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
