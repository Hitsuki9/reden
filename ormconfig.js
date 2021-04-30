module.exports = {
  type: 'postgres',
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  logging: process.env.NODE_ENV === 'development',
  entities: ['server/orm/*.entity.ts']
};
