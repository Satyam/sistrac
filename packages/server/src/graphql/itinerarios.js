import { readItinerarios, readItinerario } from '../dbOps/itinerarios';
import { readEscalasPorItinerario } from '../dbOps/escalas';
import { readTrenesPorItinerario } from '../dbOps/trenes';

export const typeDefs = `
  type Itinerario {
    idItinerario: ID!
    nombre: String
    escalas: [Escala]
    trenes: [Tren]
  }
  extend type Query {
    itinerarios: [Itinerario]
    itinerario(idItinerario: ID): Itinerario
  }
`;

export const resolvers = {
  Query: {
    itinerarios: () => readItinerarios(),
    itinerario: (parent, { idItinerario }) =>
      readItinerario(parseInt(idItinerario, 10)),
  },
  Itinerario: {
    escalas({ idItinerario }) {
      return readEscalasPorItinerario(parseInt(idItinerario, 10));
    },
    trenes({ idItinerario }) {
      return readTrenesPorItinerario(parseInt(idItinerario, 10));
    },
  },
};
