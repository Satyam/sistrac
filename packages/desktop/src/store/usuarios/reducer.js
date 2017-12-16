import {
  REPLY_RECEIVED,
  REQUEST_SENT,
  FAILURE_RECEIVED,
} from '../utils/promiseMiddleware';

import {
  NAME,
  GET_USUARIOS,
  GET_USUARIO,
  UPDATE_USUARIO,
  CREATE_USUARIO,
  DELETE_USUARIO,
  LOGIN,
} from './constants';

export default (state = [], action) => {
  if (action && action.stage && action.stage !== REPLY_RECEIVED) return state;
  switch (action.type) {
    case LOGIN:
      return [...state, action.payload];
    case GET_USUARIO:
      return [];
    default:
      return state;
  }
};
