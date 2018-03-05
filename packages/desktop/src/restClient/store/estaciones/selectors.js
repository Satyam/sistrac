import { NAME } from './constants';

import { selTren, selEvento } from '_store/selectors';

export function selEstaciones(state) {
  return Object.values(state[NAME]);
}

export function selEstacion(state, idEstacion) {
  return state[NAME][idEstacion];
}

export function selTrenesPorEstacion(state, idEstacion) {
  const trenes = state[NAME][idEstacion].trenes;
  return trenes ? trenes.map(idTren => selTren(state, idTren)) : [];
}

export function selEventosPorEstacion(state, idEstacion) {
  const eventos = state[NAME][idEstacion].eventos;

  return eventos ? eventos.map(idEvento => selEvento(state, idEvento)) : [];
}
