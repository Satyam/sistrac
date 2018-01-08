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
