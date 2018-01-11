import { readTiposEmergencias, readTipoEmergencia } from '../dbOps/tipos';

export const typeDefs = `
  type TipoEmergencia {
    idTipoEmergencia: Int
    descr: String
  }
  extend type Query {
    tiposEmergencias: [TipoEmergencia]
    tipoEmergencia(idTipoEmergencia: ID): TipoEmergencia
  }
`;

export const resolvers = {
  Query: {
    tiposEmergencias: () => readTiposEmergencias(),
    tipoEmergencia: (parent, { idTipoEmergencia }) =>
      readTipoEmergencia(parseInt(idTipoEmergencia, 10)),
  },
};
