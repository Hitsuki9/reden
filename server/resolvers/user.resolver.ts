import { ObjectType, Field, Int, Resolver, Query } from 'type-graphql';

@ObjectType()
class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  avatar: string;

  @Field()
  createdAt: string;
}

@Resolver()
export default class UserResolver {
  @Query(() => User)
  user() {
    return {
      id: 1,
      username: 'Jackson',
      avatar: '',
      createdAt: '2021-04-26 11:21:00'
    };
  }
}
