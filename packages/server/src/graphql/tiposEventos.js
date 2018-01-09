import { readTiposEventos, readTipoEvento } from '../dbOps/tipos';

export const typeDefs = `
  type TipoEvento {
    idTipoEvento: Int
    preposicion: String
    descr: String
  }
  extend type Query {
    tiposEventos: [TipoEvento]
    tipoEvento(idTipoEvento: ID): TipoEvento
  }
`;

export const resolvers = {
  Query: {
    tiposEventos: () => readTiposEventos(),
    tipoEvento: (parent, { idTipoEvento }) => readTipoEvento(idTipoEvento),
  },
};
