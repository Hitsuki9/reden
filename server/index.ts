import mongoose from 'mongoose';
import chalk from 'chalk';
import server from './server';
import Socket from './models/socket';
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
    console.log(chalk.green('connect database success!'));
    server.listen(9000, async () => {
      // 重启服务时删除所有 socket 连接记录
      await Socket.deleteMany({});
      console.log(
        `server listen on ${chalk.blue.underline('http://localhost:9000')}`
      );
    });
  } catch (err) {
    console.error(chalk.red('connect database error!'));
    console.error(chalk.red(err));
    process.exit(1);
  }
})();
