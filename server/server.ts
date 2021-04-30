import 'reflect-metadata';
import { createServer } from 'http';
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { getSchema } from './lib/graphql';
import { connect } from './orm';
import { logger } from './lib/logger';

export default async function startServer() {
  const app = new Koa();
  const schema = await getSchema();
  const apollo = new ApolloServer({ schema });

  apollo.applyMiddleware({ app, path: '/api/graphql' });

  await connect();

  const server = createServer(app.callback());
  const port = process.env.PORT;
  server.listen(port, () => logger.info(`Server on ${port}`));

  return {
    server
  };
}
