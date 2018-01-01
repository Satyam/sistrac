import restAPI from '_store/utils/restAPI';

import {
  NAME,
  // GET_USUARIOS,
  // GET_USUARIO,
  // UPDATE_USUARIO,
  // CREATE_USUARIO,
  // DELETE_USUARIO,
  LOGIN,
  LOGOUT,
  GET_USUARIO_ACTUAL,
} from './constants';

const api = restAPI(NAME);

export function login(usuario, password) {
  return async dispatch =>
    await dispatch({
      type: LOGIN,
      payload: {
        usuario,
        password,
      },
      promise: api.update('/login', { usuario, password }),
    });
}

export function logout() {
  return async dispatch =>
    await dispatch({
      type: LOGOUT,
      promise: api.read('/logout'),
    });
}

export function getUsuarioActual() {
  return async dispatch =>
    await dispatch({
      type: GET_USUARIO_ACTUAL,
      promise: api.read('/__actual'),
    });
}
