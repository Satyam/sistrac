import {
  readTrenesPorEstacion,
  readTrenesPorItinerario,
  readTren,
} from '../dbOps/trenes';
import { readUsuario } from '../dbOps/usuarios';
import { readItinerario } from '../dbOps/itinerarios';

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
    trenes(idEstacion: ID, idItinerario: ID): [Tren]
    tren(idTren: ID): Tren
  }
`;

export const resolvers = {
  Query: {
    trenes: (parent, { idEstacion, idItinerario }) => {
      if (idEstacion) return readTrenesPorEstacion(idEstacion);
      if (idItinerario) return readTrenesPorItinerario(idItinerario);
      return [];
    },

    tren: (parent, { idTren }) => readTren(idTren),
  },

  Tren: {
    guarda({ idGuarda }) {
      return readUsuario(idGuarda);
    },
    ayudante({ idAyudante }) {
      return readUsuario(idAyudante);
    },
    conductor({ idConductor }) {
      return readUsuario(idConductor);
    },
    itinerario({ idItinerario }) {
      return readItinerario(idItinerario);
    },
  },
};
