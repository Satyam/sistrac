import {
  readEscala,
  readEscalasPorEstacion,
  readEscalasPorItinerario,
} from '../dbOps/escalas';
import { readEstacion } from '../dbOps/estaciones';
import { readItinerario } from '../dbOps/itinerarios';

export const typeDefs = `
  type Escala {
    idEscala: ID!
    estacion: Estacion
    itinerario: Itinerario
    orden: Int
    sale: Int
    llega: Int
  }
  extend type Query {
    escalas(idEstacion: ID, idItinerario: ID): [Escala]
    escala(idEscala: ID): Escala
  }
`;

export const resolvers = {
  Query: {
    escalas: (parent, { idEstacion, idItinerario }) => {
      if (idEstacion) return readEscalasPorEstacion(idEstacion);
      if (idItinerario) return readEscalasPorItinerario(idItinerario);
      return [];
    },

    escala: (parent, { idEscala }) => readEscala(idEscala),
  },
  Escala: {
    estacion({ idEstacion }) {
      return readEstacion(idEstacion);
    },
    itinerario({ idItinerario }) {
      return readItinerario(idItinerario);
    },
  },
};
