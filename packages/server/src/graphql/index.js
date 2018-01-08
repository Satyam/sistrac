import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';
const defs = [
  'types',
  'estaciones',
  'eventos',
  'itinerarios',
  'tiposEmergencias',
  'tiposEventos',
  'trenes',
  'usuarios',
];

const merged = defs.reduce(
  (schema, def) => {
    const imp = require('./' + def);
    return {
      typeDefs: schema.typeDefs + (imp.typeDefs || ''),
      resolvers: merge(schema.resolvers, imp.resolvers),
    };
  },
  { typeDefs: '', resolvers: {} },
);
export default makeExecutableSchema(merged);
