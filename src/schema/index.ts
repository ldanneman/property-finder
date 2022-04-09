import { buildSchemaSync, Resolver, Query } from 'type-graphql';
import { ImageResolver } from './image';
// import { HouseResolver } from './house';
import { authChecker } from './auth';

class DummyResolver {
  @Query((_returns) => String)
  hello() {
    return 'Hello World!';
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver, ImageResolver],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
});
