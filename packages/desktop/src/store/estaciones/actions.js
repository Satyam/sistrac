import restAPI from '../utils/restAPI';

import {
  NAME,
  GET_ESTACIONES,
  GET_ESTACION,
  GET_ITINERARIOS_ESTACION,
  // UPDATE_ESTACION,
  // CREATE_ESTACION,
  // DELETE_ESTACION,
} from './constants';

const api = restAPI(NAME);

export function getEstaciones() {
  return async (dispatch, getState) => {
    await dispatch({
      type: GET_ESTACIONES,
      promise: api.read('/'),
    });
  };
}

export function getEstacion(idEstacion) {
  return async (dispatch, getState) => {
    await dispatch({
      type: GET_ESTACION,
      payload: {
        idEstacion,
      },
      promise: api.read(`/${idEstacion}`),
    });
  };
}

export function getItinerariosEstacion(idEstacion) {
  return async dispatch =>
    await dispatch({
      type: GET_ITINERARIOS_ESTACION,
      payload: {
        idEstacion,
      },
      promise: api.read(`/itinerarios/${idEstacion}`),
    });
}
