import restAPI from '_store/utils/restAPI';

import {
  NAME,
  GET_ESTACIONES,
  GET_ESTACION,
  // UPDATE_ESTACION,
  // CREATE_ESTACION,
  // DELETE_ESTACION,
} from './constants';

const api = restAPI(NAME);

export function getEstaciones() {
  return dispatch =>
    dispatch({
      type: GET_ESTACIONES,
      promise: api.read('/'),
    });
}

export function getEstacion(idEstacion) {
  return dispatch =>
    dispatch({
      type: GET_ESTACION,
      payload: {
        idEstacion,
      },
      promise: api.read(`/${idEstacion}`),
    });
}
