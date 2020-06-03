import mongoose from 'mongoose';
import chalk from 'chalk';
import server from './server';
import Socket from './models/socket';
import config from '../config/server';

const { dbuser, dbpassword, port, host } = config;

(async () => {
  try {
    await mongoose.connect(
      `mongodb://${dbuser}:${dbpassword}@ds053937.mlab.com:53937/fiora`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
    console.log(chalk.green('connect database success!'));
    server.listen(port, () => {
      // 重启服务时删除所有 socket 连接记录
      console.log(
        `server listen on ${chalk.blue.underline(`${host}:${port}`)}`
      );
      Socket.deleteMany({});
    });
  } catch (err) {
    console.error(chalk.red('connect database error!'));
    console.error(chalk.red(err));
    process.exit(1);
  }
})();
