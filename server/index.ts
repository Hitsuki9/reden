import mongoose from 'mongoose';
import server from './server';
import config from '../config/server';

(async () => {
  try {
    await mongoose.connect(
      `mongodb://${config.dbuser}:${config.dbpassword}@ds053937.mlab.com:53937/fiora`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
    console.log('connect database success!');
    server.listen(9000, () => {
      console.log('server listen on http://localhost:9000\n');
    });
  } catch (err) {
    console.error('connect database error!');
    console.error(err);
    process.exit(1);
  }
})();
