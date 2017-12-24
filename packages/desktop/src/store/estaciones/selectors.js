import { NAME } from './constants';

export function selEstaciones(state) {
  return Object.values(state[NAME]);
}

export function selEstacion(state, idEstacion) {
  return state[NAME][idEstacion];
}

export function selItinerariosEstacion(state, idEstacion) {
  const estacion = state[NAME][idEstacion];
  return estacion && estacion.itinerarios;
}
