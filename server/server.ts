import 'reflect-metadata';
import { createServer } from 'http';
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { getSchema } from './lib/graphql';

export default async function startServer() {
  const app = new Koa();
  const schema = await getSchema();
  const apollo = new ApolloServer({ schema });

  apollo.applyMiddleware({ app, path: '/api/graphql' });

  const server = createServer(app.callback());
  server.listen(process.env.PORT);
}
