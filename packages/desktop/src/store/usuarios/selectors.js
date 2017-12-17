import { NAME } from './constants';

export function selUsuarioActivo(state) {
  const usuarios = state[NAME];
  if (usuarios.vence < Date.now()) return {};
  if (!usuarios.activo) return {};
  return usuarios.hash[usuarios.activo];
}
