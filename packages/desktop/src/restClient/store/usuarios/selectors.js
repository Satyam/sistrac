import { NAME } from './constants';

export function selUsuarioActivo(state) {
  const usuarios = state[NAME];
  if (usuarios.vence < Date.now()) return {};
  if (!usuarios.activo) return {};
  return usuarios.hash[usuarios.activo];
}

export function selStatusUsuario(state) {
  return state[NAME].status;
}

export function selUsuario(state, idUsuario) {
  return state[NAME].hash[idUsuario];
}
