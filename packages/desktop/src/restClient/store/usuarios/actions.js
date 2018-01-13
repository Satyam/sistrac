import restAPI from '_store/utils/restAPI';

import {
  NAME,
  GET_USUARIOS,
  // GET_USUARIO,
  // UPDATE_USUARIO,
  // CREATE_USUARIO,
  // DELETE_USUARIO,
  LOGIN,
  LOGOUT,
  GET_USUARIO_ACTUAL,
} from './constants';

import { selUsuario } from '_store/selectors';

const api = restAPI(NAME);

export function login(usuario, password) {
  return dispatch =>
    dispatch({
      type: LOGIN,
      payload: {
        usuario,
        password,
      },
      promise: api.update('/login', { usuario, password }),
    });
}

export function logout() {
  return dispatch =>
    dispatch({
      type: LOGOUT,
      promise: api.read('/logout'),
    });
}

export function getUsuarioActual() {
  return dispatch =>
    dispatch({
      type: GET_USUARIO_ACTUAL,
      promise: api.read('/__actual'),
    });
}

export function getUsuarios(usuarios) {
  return (dispatch, getState) => {
    let faltantes;
    if (usuarios) {
      const state = getState();
      faltantes = usuarios.filter(idUsuario => !selUsuario(state, idUsuario));
      if (!faltantes.length) return;
      return dispatch({
        type: GET_USUARIOS,
        payload: { faltantes },
        promise: api.read('/' + faltantes.join(',')),
      });
    }

    return dispatch({
      type: GET_USUARIOS,
      promise: api.read('/'),
    });
  };
}
