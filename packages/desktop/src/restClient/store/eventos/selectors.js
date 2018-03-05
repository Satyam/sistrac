import { NAME } from './constants';

export function selEventosPorTren(state, idTren) {
  return Object.values(state[NAME]).filter(evento => evento.idTren === idTren);
}

export function selEvento(state, idEvento) {
  return state[NAME][idEvento];
}
