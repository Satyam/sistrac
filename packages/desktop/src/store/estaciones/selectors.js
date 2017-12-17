import { NAME } from './constants';

export function selEstaciones(state) {
  return Object.values(state[NAME]);
}
