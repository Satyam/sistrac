import {
  REPLY_RECEIVED,
  REQUEST_SENT,
  // FAILURE_RECEIVED,
} from '_store/utils/promiseMiddleware';

import indexBy from '_store/utils/indexBy';

import {
  GET_ESTACIONES,
  GET_ESTACION,
  UPDATE_ESTACION,
  CREATE_ESTACION,
  DELETE_ESTACION,
  GET_TRENES_ESTACION,
  GET_EVENTOS_POR_ESTACION,
} from './constants';

export default (state = {}, action) => {
  const stage = action && action.stage;
  switch (stage) {
    case REQUEST_SENT: {
      switch (action.type) {
        case GET_TRENES_ESTACION: {
          const idEstacion = action.payload.idEstacion;
          return {
            ...state,
            [idEstacion]: {
              ...state[idEstacion],
              trenes: [],
            },
          };
        }
        case GET_EVENTOS_POR_ESTACION: {
          const idEstacion = action.payload.idEstacion;
          return {
            ...state,
            [idEstacion]: {
              ...state[idEstacion],
              eventos: [],
            },
          };
        }
        default:
          return state;
      }
    }

    case REPLY_RECEIVED: {
      switch (action.type) {
        case GET_ESTACIONES:
          return indexBy(action.payload, 'idEstacion', state);
        case GET_ESTACION: {
          const estacion = action.payload;
          return {
            ...state,
            [estacion.idEstacion]: estacion,
          };
        }
        case GET_TRENES_ESTACION: {
          const idEstacion = action.payload.idEstacion;
          return {
            ...state,
            [idEstacion]: {
              ...state[idEstacion],
              trenes: action.payload.map(tren => tren.idTren),
            },
          };
        }
        case GET_EVENTOS_POR_ESTACION: {
          const idEstacion = action.payload.idEstacion;
          return {
            ...state,
            [idEstacion]: {
              ...state[idEstacion],
              eventos: action.payload.map(evento => evento.idEvento),
            },
          };
        }
        case CREATE_ESTACION:
          return {
            ...state,
            [action.payload.idEstacion]: action.payload,
          };

        case UPDATE_ESTACION:
          return {
            ...state,
            [action.payload.idEstacion]: action.payload,
          };
        case DELETE_ESTACION: {
          const { [action.payload.idEstacion]: deleted, ...rest } = state;
          return rest;
        }

        default:
          return state;
      }
    }
    default:
      return state;
  }
};
