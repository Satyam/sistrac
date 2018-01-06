import restAPI from '_store/utils/restAPI';

import {
  NAME,
  GET_EVENTOS_POR_ESTACION,
  GET_EVENTOS_POR_TREN,
} from './constants';

import { selEstacion } from '_store/selectors';

const api = restAPI(NAME);

export function getEventosPorEstacion(idEstacion) {
  return async (dispatch, getState) => {
    const estacion = selEstacion(getState(), idEstacion);
    if (estacion.eventos) return;
    return await dispatch({
      type: GET_EVENTOS_POR_ESTACION,
      payload: {
        idEstacion,
      },
      promise: api.read(`/estacion/${idEstacion}`),
    });
  };
}

export function getEventosPorTren(idTren) {
  return async (dispatch, getState) =>
    await dispatch({
      type: GET_EVENTOS_POR_TREN,
      payload: {
        idTren,
      },
      promise: api.read(`/tren/${idTren}`),
    });
}