export const typeDefs = `
  type Itinerario {
    idItinerario: ID!
    nombre: String
  }
  extend type Query {
    itinerarios: [Itinerario]
    itinerario(idItinerario: ID): Itinerario
  }
`;
