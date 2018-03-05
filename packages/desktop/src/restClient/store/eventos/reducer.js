import { REPLY_RECEIVED } from '_store/utils/promiseMiddleware';

import { GET_EVENTOS_POR_TREN } from './constants';
import { GET_EVENTOS_POR_ESTACION } from '../estaciones/constants';

import indexBy from '_store/utils/indexBy';

export default (state = {}, action) => {
  if (action && action.stage && action.stage !== REPLY_RECEIVED) return state;
  switch (action.type) {
    case GET_EVENTOS_POR_ESTACION:
    case GET_EVENTOS_POR_TREN:
      return indexBy(action.payload, 'idEvento', state);
    default:
      return state;
  }
};
