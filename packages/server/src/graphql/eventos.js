import { readEventosPorTren, readEvento } from '../dbOps/eventos';
import { readUsuario } from '../dbOps/usuarios';
import { readEstacion, readEventosPorEstacion } from '../dbOps/estaciones';
import { readTipoEvento, readTipoEmergencia } from '../dbOps/tipos';
import { readTren } from '../dbOps/trenes';

export const typeDefs = `
  type Evento {
    idEvento: ID!
    fecha: Date
    usuario: Usuario
    funcion: Int
    tren: Tren
    estacion: Estacion
    combustible: Int
    observaciones: String
    longitud: Float
    velocidad: Float
    latitud: Float
    tipoEmergencia: TipoEmergencia
    tipoEvento: TipoEvento
  }
  extend type Query {
    eventos(idTren: ID, idEstacion: ID): [Evento]
    evento(idEvento: ID): Evento
  }
`;

export const resolvers = {
  Query: {
    eventos: (parent, { idTren, idEstacion }) => {
      if (idTren) return readEventosPorTren(parseInt(idTren, 10));
      if (idEstacion) return readEventosPorEstacion(idEstacion);
      return [];
    },

    evento: (parent, { idEvento }) => readEvento(parseInt(idEvento, 10))
  },

  Evento: {
    usuario({ idUsuario }) {
      return readUsuario(idUsuario);
    },
    estacion({ idEstacion }) {
      return readEstacion(idEstacion);
    },
    tipoEmergencia({ idTipoEmergencia }) {
      return readTipoEmergencia(idTipoEmergencia);
    },
    tipoEvento({ idTipoEvento }) {
      return readTipoEvento(idTipoEvento);
    },
    tren({ idTren }) {
      return readTren(idTren);
    }
  }
};
