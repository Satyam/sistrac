import restAPI from '_store/utils/restAPI';

import { NAME, GET_TRENES_ESTACION } from './constants';

import { selEstacion } from '_store/selectors';

const api = restAPI(NAME);

export function getTrenesEstacion(idEstacion) {
  return (dispatch, getState) => {
    const estacion = selEstacion(getState(), idEstacion);
    if (estacion.trenes) return;
    return dispatch({
      type: GET_TRENES_ESTACION,
      payload: {
        idEstacion,
      },
      promise: api.read(`/estacion/${idEstacion}`).then(trenes => {
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
