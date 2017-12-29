import restAPI from '../utils/restAPI';

import { NAME, GET_TIPOS_EVENTOS, GET_TIPOS_EMERGENCIAS } from './constants';

import { selHayTiposEventos, selHayTiposEmergencias } from './selectors';

const api = restAPI(NAME);

export function loadTiposEventos() {
  return async (dispatch, getState) => {
    if (selHayTiposEventos(getState())) return;
    await dispatch({
      type: GET_TIPOS_EVENTOS,
      promise: api.read('/eventos'),
    });
  };
}

export function loadTiposEmergencias() {
  return async (dispatch, getState) => {
    if (selHayTiposEmergencias(getState())) return;
    await dispatch({
      type: GET_TIPOS_EMERGENCIAS,
      promise: api.read('/emergencias'),
    });
  };
}

