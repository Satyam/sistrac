import {
  REPLY_RECEIVED,
  // REQUEST_SENT,
  // FAILURE_RECEIVED,
} from '_store/utils/promiseMiddleware';

import indexBy from '_store/utils/indexBy';

import { GET_TRENES_ESTACION } from '_store/estaciones/constants';
export default (state = {}, action) => {
  if (action && action.stage && action.stage !== REPLY_RECEIVED) return state;
  switch (action.type) {
    case GET_TRENES_ESTACION:
      return indexBy(action.payload, 'idTren', state);
    default:
      return state;
  }
};
