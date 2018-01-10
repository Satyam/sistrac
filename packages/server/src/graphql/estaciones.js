import { readEstaciones, readEstacion } from '../dbOps/estaciones';
import { readItinerariosPorEstacion } from '../dbOps/itinerarios';
import { readTrenesPorEstacion } from '../dbOps/trenes';
import { readEventosPorEstacion } from '../dbOps/eventos';

export const typeDefs = `
type Estacion {
  idEstacion: ID!
  nombre: String
  latitud: Float
  longitud: Float
  itinerarios: [Itinerario]
  trenes: [Tren]
  eventos: [Evento]
}

extend type Query {
  estaciones: [Estacion]
  estacion(idEstacion: ID): Estacion
}
`;

export const resolvers = {
  Query: {
    estaciones: () => readEstaciones(),
    estacion: (parent, { idEstacion }) => readEstacion(idEstacion),
  },
  Estacion: {
    itinerarios({ idEstacion }) {
      return readItinerariosPorEstacion(idEstacion);
    },
    trenes({ idEstacion }) {
      return readTrenesPorEstacion(idEstacion);
    },
    eventos({ idEstacion }) {
      return readEventosPorEstacion(idEstacion);
    },
  },
};
