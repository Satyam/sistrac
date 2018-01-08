import {
  eventosPorTren,
  eventosPorEstacion,
  readEvento,
} from '../dbOps/eventos';
import { readUsuario } from '../dbOps/usuarios';
import { readEstacion } from '../dbOps/estaciones';

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
      console.log('query: eventos', parent, idTren, idEstacion);
      if (idTren) return eventosPorTren(idTren);
      if (idEstacion) return eventosPorEstacion(idEstacion);
      return [];
    },

    evento: (parent, { idEvento }) => {
      console.log('parent', parent);
      return readEvento(idEvento);
    },
  },

  Evento: {
    usuario({ idUsuario }) {
      console.log('Evento:usuario', idUsuario);
      return readUsuario(idUsuario);
    },
    estacion({ idEstacion }) {
      console.log('Evento:estacion', idEstacion);
      return readEstacion(idEstacion);
    },
  },
};
