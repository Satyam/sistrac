import { REPLY_RECEIVED } from '../utils/promiseMiddleware';
import indexBy from '../utils/indexBy';

import { GET_TIPOS_EVENTOS, GET_TIPOS_EMERGENCIAS } from './constants';

export default (state = { eventos: {}, emergencias: {} }, action) => {
  if (action && action.stage && action.stage !== REPLY_RECEIVED) return state;
  switch (action.type) {
    case GET_TIPOS_EVENTOS:
      return {
        ...state,
        eventos: indexBy(action.payload, 'idTipoEvento'),
      };
    case GET_TIPOS_EMERGENCIAS:
      return {
        ...state,
        emergencias: indexBy(action.payload, 'idTipoEmergencia'),
      };
    default:
      return state;
  }
};
