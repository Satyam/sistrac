import { NAME } from './constants';

export function selIsLoggedIn(state, username) {
  return state[NAME].username === username;
}

export function selUsuario(state) {
  return state[NAME].usuario;
}
