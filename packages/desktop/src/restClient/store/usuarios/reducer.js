import indexBy from '_store/utils/indexBy';

import {
  REPLY_RECEIVED,
  REQUEST_SENT,
  FAILURE_RECEIVED,
} from '_store/utils/promiseMiddleware';

import {
  // NAME,
  GET_USUARIOS,
  GET_USUARIO,
  // UPDATE_USUARIO,
  // CREATE_USUARIO,
  // DELETE_USUARIO,
  LOGIN,
  LOGOUT,
  GET_USUARIO_ACTUAL,
} from './constants';

import { SESSION_TIMEOUT } from '_src/config';

export const STATUS_INITIAL = 0;
export const STATUS_UNAUTHORIZED = 1;
export const STATUS_LOGGED_IN = 2;
export const STATUS_GETTING_CURRENT_USER = 3;
export const STATUS_LOGGED_OUT = 4;

export default (
  state = { hash: {}, activo: null, vence: null, status: STATUS_INITIAL },
  action,
) => {
  const stage = action && action.stage;
  switch (stage) {
    case FAILURE_RECEIVED:
      if (action.error === 401) {
        // 401 HTTP code: Unauthorized
        return {
          ...state,
          activo: null,
          vence: null,
          status:
            state.prevStatus === STATUS_INITIAL
              ? STATUS_LOGGED_OUT
              : STATUS_UNAUTHORIZED,
          prevStatus: null,
        };
      }
      return state;
    case REQUEST_SENT:
      switch (action.type) {
        case GET_USUARIO_ACTUAL:
          return {
            ...state,
            status: STATUS_GETTING_CURRENT_USER,
            prevStatus: state.status,
          };
        case GET_USUARIOS: {
          const idUsuarios = action.payload.faltantes;
          if (!idUsuarios) return state;
          return {
            ...state,
            hash: idUsuarios.reduce(
              (hash, idUsuario) => ({
                ...hash,
                [idUsuario]: { idUsuario },
              }),
              state.hash,
            ),
          };
        }
        default:
          return state;
      }
    case REPLY_RECEIVED:
      switch (action.type) {
        case GET_USUARIO_ACTUAL:
        case LOGIN: {
          const usuario = action.payload;
          const idUsuario = usuario.idUsuario;
          return {
            ...state,
            activo: idUsuario,
            vence: Date.now() + SESSION_TIMEOUT * 1000,
            hash: { ...state.hash, [idUsuario]: usuario },
            status: STATUS_LOGGED_IN,
          };
        }
        case LOGOUT:
          return {
            ...state,
            activo: null,
            vence: null,
            status: STATUS_LOGGED_OUT,
          };
        case GET_USUARIO: {
          const usuario = action.payload;
          const idUsuario = usuario.idUsuario;
          return {
            ...state,
            hash: { ...state.hash, [idUsuario]: usuario },
          };
        }
        case GET_USUARIOS:
          return {
            ...state,
            hash: indexBy(action.payload, 'idUsuario', state.hash),
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
