import restAPI from '_store/utils/restAPI';

import { NAME, GET_EVENTOS_POR_TREN } from './constants';

const api = restAPI(NAME);

export function getEventosPorTren(idTren) {
  return dispatch =>
    dispatch({
      type: GET_EVENTOS_POR_TREN,
      payload: {
        idTren,
      },
      promise: api.read(`/tren/${idTren}`),
    });
}
