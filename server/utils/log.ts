import chalk from 'chalk';
import dayjs from 'dayjs';

export function log(msg: string | object) {
  console.log(
    `${chalk.blue(`[${dayjs().format('YYYY-MM-DD HH:mm:ss SSS')}]`)}`,
    msg
  );
}
