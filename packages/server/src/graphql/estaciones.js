import { readEstaciones, readEstacion } from '../dbOps/estaciones';

export const typeDefs = `
type Estacion {
  idEstacion: ID!
  nombre: String
  latitud: Float
  longitud: Float
}

extend type Query {
  estaciones: [Estacion]
  estacion(idEstacion: ID): Estacion
}
`;

export const resolvers = {
  Query: {
    estaciones: () => readEstaciones(),
    estacion: (parent, { idEstacion }) => {
      console.log('parent', parent);
      return readEstacion(idEstacion);
    },
  },
};
