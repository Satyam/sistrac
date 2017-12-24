import {
  REPLY_RECEIVED,
  // REQUEST_SENT,
  // FAILURE_RECEIVED,
} from '../utils/promiseMiddleware';

import {
  GET_ESTACIONES,
  GET_ESTACION,
  GET_ITINERARIOS_ESTACION,
  // UPDATE_ESTACION,
  // CREATE_ESTACION,
  // DELETE_ESTACION,
} from './constants';

export default (state = {}, action) => {
  if (action && action.stage && action.stage !== REPLY_RECEIVED) return state;
  switch (action.type) {
    case GET_ESTACIONES:
      return action.payload.reduce(
        (estaciones, estacion) => ({
          ...estaciones,
          [estacion.idEstacion]: estacion,
        }),
        state,
      );
    case GET_ESTACION: {
      const estacion = action.payload;
      return {
        ...state,
        [estacion.idEstacion]: estacion,
      };
    }
    case GET_ITINERARIOS_ESTACION: {
      const idEstacion = action.payload.idEstacion;
      return {
        ...state,
        [idEstacion]: {
          ...state[idEstacion],
          itinerarios: [].concat(action.payload),
        },
      };
    }
    default:
      return state;
  }
};
