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
      if (idItinerario)
        return readTrenesPorItinerario(parseInt(idItinerario, 10));
      return [];
    },

    tren: (parent, { idTren }) => readTren(parseInt(idTren, 10)),
  },

  Tren: {
    guarda({ idGuarda }) {
      return readUsuario(parseInt(idGuarda, 10));
    },
    ayudante({ idAyudante }) {
      return readUsuario(parseInt(idAyudante, 10));
    },
    conductor({ idConductor }) {
      return readUsuario(parseInt(idConductor, 10));
    },
    itinerario({ idItinerario }) {
      return readItinerario(parseInt(idItinerario, 10));
    },
  },
};
