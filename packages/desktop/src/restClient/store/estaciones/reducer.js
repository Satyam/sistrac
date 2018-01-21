import {
  REPLY_RECEIVED,
  // REQUEST_SENT,
  // FAILURE_RECEIVED,
} from '_store/utils/promiseMiddleware';

import indexBy from '_store/utils/indexBy';

import {
  GET_ESTACIONES,
  GET_ESTACION,
  UPDATE_ESTACION,
  CREATE_ESTACION,
  // DELETE_ESTACION,
  GET_TRENES_ESTACION,
} from './constants';

import { GET_EVENTOS_POR_ESTACION } from '_store/eventos/constants';

export default (state = {}, action) => {
  if (action && action.stage && action.stage !== REPLY_RECEIVED) return state;
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
          trenes: action.payload,
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
    case CREATE_ESTACION: {
      console.log('reducer create', action.payload);
      return {
        ...state,
        [action.payload.idEstacion]: action.payload,
      };
    }
    case UPDATE_ESTACION:
      console.log('reducer create', action.payload);
      return state;
    default:
      return state;
  }
};
