import restAPI from '_store/utils/restAPI';

import {
  NAME,
  GET_ESTACIONES,
  GET_ESTACION,
  UPDATE_ESTACION,
  CREATE_ESTACION,
  DELETE_ESTACION,
  EXISTE_ESTACION,
  GET_TRENES_ESTACION,
} from './constants';

import { selEstacion } from './selectors';

const api = restAPI(NAME);

export function getEstaciones() {
  return dispatch =>
    dispatch({
      type: GET_ESTACIONES,
      promise: api.read('/'),
    });
}

export function getEstacion(idEstacion) {
  return dispatch =>
    dispatch({
      type: GET_ESTACION,
      payload: {
        idEstacion,
      },
      promise: api.read(`/${idEstacion}`),
    });
}

export function existeEstacion(idEstacion) {
  return dispatch =>
    dispatch({
      type: EXISTE_ESTACION,
      payload: {
        idEstacion,
      },
      promise: api.read(`/existe/${idEstacion}`).then(
        () => ({
          exists: true,
        }),
        err => {
          if (err.code === 404) return { exists: false };
          throw err;
        },
      ),
    }).then(action => action.payload.exists);
}

export function getTrenesEstacion(idEstacion) {
  return (dispatch, getState) => {
    const estacion = selEstacion(getState(), idEstacion);
    if (estacion.trenes) return;
    return dispatch({
      type: GET_TRENES_ESTACION,
      payload: {
        idEstacion,
      },
      promise: api.read(`/trenes/${idEstacion}`).then(trenes => {
        const ts = trenes.map(tren => ({
          ...tren,
          fecha: new Date(tren.fecha),
          idEstacion,
        }));
        ts.idEstacion = idEstacion;
        return ts;
      }),
    });
  };
}

export function createEstacion(data) {
  console.log('createEstacion', data);
  return dispatch =>
    dispatch({
      type: CREATE_ESTACION,
      payload: data,
      promise: api.create('/', data),
    })
      .then(() => true)
      .catch(() => false);
}

export function updateEstacion(idEstacion, data) {
  console.log('updateEstacion', idEstacion, data);
  return dispatch =>
    dispatch({
      type: UPDATE_ESTACION,
      payload: { idEstacion, ...data },
      promise: api.update(idEstacion, data),
    });
}

export function deleteEstacion(idEstacion) {
  return dispatch =>
    dispatch({
      type: DELETE_ESTACION,
      payload: { idEstacion },
      promise: api.delete(idEstacion),
    });
}
