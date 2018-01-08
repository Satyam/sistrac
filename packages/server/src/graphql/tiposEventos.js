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
