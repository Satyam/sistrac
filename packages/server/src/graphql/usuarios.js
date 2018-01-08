import { readUsuarios, readUsuarioPorUsuario } from '../dbOps/usuarios';

export const typeDefs = `

type Usuario {
  idUsuario: ID!
  password: String
  usuario: String
  nivel: Int
  rolGuarda: Boolean
  rolDios: Boolean
  rolSupervisor: Boolean
  rolMecanico: Boolean
  funcion: Int
  nombre: String
}

# This type specifies the entry points into our API.
extend type Query {
   usuarios: [Usuario]
   usuario(usuario: String, idUsuario: ID): Usuario
}
`;
export const resolvers = {
  Query: {
    usuarios: () => readUsuarios(),
    usuario: (parent, { usuario, idUsuario }) => {
      console.log('Query: usuario', parent, usuario, idUsuario);
      return readUsuarioPorUsuario(usuario);
    },
  },
};
