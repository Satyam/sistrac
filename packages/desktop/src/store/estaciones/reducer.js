import {
  REPLY_RECEIVED,
  REQUEST_SENT,
  FAILURE_RECEIVED,
} from '../utils/promiseMiddleware';

import {
  GET_ESTACION,
  UPDATE_ESTACION,
  CREATE_ESTACION,
  DELETE_ESTACION,
} from './constants';

export default (state = [], action) => {
  if (action && action.stage && action.stage !== REPLY_RECEIVED) return state;
  switch (action.type) {
    case GET_ESTACION:
      return [...state, action.payload];
    case UPDATE_ESTACION:
      return [];
    default:
      return state;
  }
};
