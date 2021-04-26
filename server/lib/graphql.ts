import { buildSchema } from 'type-graphql';
import UserResolver from '../resolvers/user.resolver';

export async function getSchema() {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  return schema;
}
