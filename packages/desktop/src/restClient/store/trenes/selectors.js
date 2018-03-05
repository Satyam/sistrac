import { NAME } from './constants';

export function selTren(state, idTren) {
  return state[NAME][idTren];
}
