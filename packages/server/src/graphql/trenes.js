export const typeDefs = `
  type Tren {
  idTren: ID!
  itinerario: Itinerario
  fecha: Date
  chapa: Int
  guarda: Usuario
  ayudante: Usuario
  conductor: Usuario
  locomotora: Int
  estado: Int
  estadoAnterior: Int
  numero: Int
}
extend type Query {
  trenes: [Tren]
  tren(idTren: ID): Tren
}
`;
