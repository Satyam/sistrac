import { NAME } from './constants';

export function selEventosPorEstacion(state, idEstacion) {
  return Object.values(state[NAME]).filter(
    evento => evento.idEstacion === idEstacion,
  );
}

export function selEventosPorTren(state, idTren) {
  return Object.values(state[NAME]).filter(evento => evento.idTren === idTren);
}
