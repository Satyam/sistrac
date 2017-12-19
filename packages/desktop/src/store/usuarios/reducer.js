import {
  REPLY_RECEIVED,
  // REQUEST_SENT,
  // FAILURE_RECEIVED,
} from '../utils/promiseMiddleware';

import {
  // NAME,
  // GET_USUARIOS,
  GET_USUARIO,
  // UPDATE_USUARIO,
  // CREATE_USUARIO,
  // DELETE_USUARIO,
  LOGIN,
  LOGOUT,
} from './constants';

import { SESSION_TIMEOUT } from '../../config';

export default (state = { hash: {}, activo: null, vence: null }, action) => {
  if (action && action.stage && action.stage !== REPLY_RECEIVED) return state;
  switch (action.type) {
    case LOGIN: {
      const usuario = action.payload;
      const idUsuario = usuario.idUsuario;
      return {
        ...state,
        activo: idUsuario,
        vence: Date.now() + SESSION_TIMEOUT * 1000,
        hash: { ...state.hash, [idUsuario]: usuario },
      };
    }
    case LOGOUT:
      return {
        ...state,
        activo: null,
        vence: null,
      };
    case GET_USUARIO: {
      const usuario = action.payload;
      const idUsuario = usuario.idUsuario;
      return {
        ...state,
        hash: { ...state.hash, [idUsuario]: usuario },
      };
    }
    default:
      return state;
  }
};
