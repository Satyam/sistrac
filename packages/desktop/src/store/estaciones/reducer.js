import {
  REPLY_RECEIVED,
  // REQUEST_SENT,
  // FAILURE_RECEIVED,
} from '../utils/promiseMiddleware';

import indexBy from '../utils/indexBy';

import {
  GET_ESTACIONES,
  GET_ESTACION,
  GET_TRENES_ESTACION,
  // UPDATE_ESTACION,
  // CREATE_ESTACION,
  // DELETE_ESTACION,
} from './constants';

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
          trenes: action.payload.map(tren => ({
            ...tren,
            fecha: Date(tren.fecha),
          })),
        },
      };
    }
    default:
      return state;
  }
};
