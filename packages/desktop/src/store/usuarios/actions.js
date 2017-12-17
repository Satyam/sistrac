import restAPI from '../utils/restAPI';

import {
  NAME,
  // GET_USUARIOS,
  // GET_USUARIO,
  // UPDATE_USUARIO,
  // CREATE_USUARIO,
  // DELETE_USUARIO,
  LOGIN,
} from './constants';

const api = restAPI(NAME);

export function login(usuario, password) {
  return async (dispatch, getState) => {
    await dispatch({
      type: LOGIN,
      payload: {
        usuario,
        password,
      },
      promise: api.update('/login', { usuario, password }),
    });
  };
}
