import { NAME } from './constants';

export function selTiposEventos(state) {
  return state[NAME].eventos;
}

export function selTiposEmergencias(state) {
  return state[NAME].emergencias;
}

export function selTipoEvento(state, idTipoEvento) {
  return state[NAME].eventos[idTipoEvento];
}

export function selTipoEmergencia(state, idTipoEmergencia) {
  return state[NAME].emergencias[idTipoEmergencia];
}

export function selHayTiposEventos(state) {
  return Object.keys(state[NAME].eventos).length > 0;
}

export function selHayTiposEmergencias(state) {
  return Object.keys(state[NAME].emergencias).length > 0;
}
