import { startServer } from './server';

(async () => {
  try {
    startServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
