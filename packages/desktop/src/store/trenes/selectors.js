import { NAME } from './constants';

export function selTrenesPorEstacion(state, idEstacion) {
  return Object.values(state[NAME]).filter(
    tren => tren.idEstacion === idEstacion,
  );
}
