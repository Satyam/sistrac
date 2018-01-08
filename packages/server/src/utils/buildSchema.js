import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';
import { readdirSync as readDir } from 'fs';
import { join, extname } from 'path';

export default function buildSchema(dir) {
  return makeExecutableSchema(
    readDir(dir).reduce(
      (schema, fileName) => {
        if (extname(fileName) !== '.js') return schema;
        const defs = require(join(dir, fileName));
        return {
          typeDefs: schema.typeDefs + (defs.typeDefs || ''),
          resolvers: merge(schema.resolvers, defs.resolvers),
        };
      },
      { typeDefs: '', resolvers: {} },
    ),
  );
}
