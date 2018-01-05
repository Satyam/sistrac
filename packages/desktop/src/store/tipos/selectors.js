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

export function selDescrEvento(state, idTipoEvento) {
  const ev = state[NAME].eventos[idTipoEvento];
  if (ev) {
    return `${ev.descr} ${ev.preposicion}`;
  }
  return '';
}

export function selTipoEmergencia(state, idTipoEmergencia) {
  return idTipoEmergencia
    ? state[NAME].emergencias[idTipoEmergencia]
    : { descr: '' };
}

export function selDescrEmergencia(state, idTipoEmergencia) {
  if (!idTipoEmergencia) return '';
  const em = state[NAME].emergencias[idTipoEmergencia];
  if (em) {
    return em.descr;
  }
  return '';
}

export function selHayTiposEventos(state) {
  return Object.keys(state[NAME].eventos).length > 0;
}

export function selHayTiposEmergencias(state) {
  return Object.keys(state[NAME].emergencias).length > 0;
}
