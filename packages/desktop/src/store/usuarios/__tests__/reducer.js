import reducer from '../reducer';
import { LOGIN, LOGOUT, GET_USUARIO } from '../constants';
import {
  REPLY_RECEIVED,
  REQUEST_SENT,
  FAILURE_RECEIVED,
} from '../../utils/promiseMiddleware';

import { SESSION_TIMEOUT } from '../../../config';
const usuario = {
  idUsuario: 20,
  usuario: 'pepe',
  password: '123456789',
  nombre: 'José Pérez',
};

const roles = {
  rolDios: false,
  rolGuarda: false,
  rolMecanico: false,
  rolSupervisor: false,
};

describe('usuarios reducer', () => {
  it('initialize', () => {
    const state = undefined;
    const action = {};
    const newState = {
      hash: {},
      activo: null,
      vence: null,
    };
    expect(reducer(state, action)).toEqual(newState);
  });
  it('should do nothing', () => {
    const state = 'whatever';
    const action = {};
    expect(reducer(state, action)).toBe(state);
  });
  it('add logged in user', () => {
    const state = {
      hash: {},
      activo: null,
      vence: null,
    };
    const action = {
      type: LOGIN,
      payload: { ...usuario, ...roles },
      stage: REPLY_RECEIVED,
    };
    const newState = {
      activo: usuario.idUsuario,
      hash: {
        [usuario.idUsuario]: { ...usuario, ...roles },
      },
      vence: Date.now() + SESSION_TIMEOUT * 1000,
    };
    expect(reducer(state, action)).toEqual(newState);
  });
  it('logout', () => {
    const state = {
      activo: usuario.idUsuario,
      hash: {
        [usuario.idUsuario]: { ...usuario, ...roles },
      },
      vence: Date.now() + SESSION_TIMEOUT * 1000,
    };
    const action = {
      type: LOGOUT,
      payload: { ...usuario, ...roles },
      stage: REPLY_RECEIVED,
    };
    const newState = {
      activo: null,
      hash: {
        [usuario.idUsuario]: { ...usuario, ...roles },
      },
      vence: null,
    };
    expect(reducer(state, action)).toEqual(newState);
  });
  it('get another user', () => {
    const state = {
      activo: usuario.idUsuario,
      hash: {
        [usuario.idUsuario]: { ...usuario, ...roles },
      },
      vence: 123456789,
    };
    const newUsuario = { ...usuario, ...roles, idUsuario: 21 };
    const action = {
      type: GET_USUARIO,
      payload: newUsuario,
      stage: REPLY_RECEIVED,
    };
    const newState = {
      ...state,
      hash: { ...state.hash, [newUsuario.idUsuario]: newUsuario },
    };
    expect(reducer(state, action)).toEqual(newState);
  });
  describe('null ops', () => {
    it('login sent', () => {
      const state = 'whatever';
      const action = {
        type: LOGIN,
        payload: { ...usuario, ...roles },
        stage: REQUEST_SENT,
      };
      expect(reducer(state, action)).toBe(state);
    });
    it('login failed', () => {
      const state = 'whatever';
      const action = {
        type: LOGIN,
        payload: { ...usuario, ...roles },
        stage: FAILURE_RECEIVED,
      };
      expect(reducer(state, action)).toBe(state);
    });
    it('logout sent', () => {
      const state = 'whatever';
      const action = {
        type: LOGOUT,
        stage: REQUEST_SENT,
      };
      expect(reducer(state, action)).toBe(state);
    });
    it('get usuario sent', () => {
      const state = 'whatever';
      const action = {
        type: GET_USUARIO,
        payload: { idUsuario: usuario.idUsuario },
        stage: REQUEST_SENT,
      };
      expect(reducer(state, action)).toBe(state);
    });
    it('get usuario failed', () => {
      const state = 'whatever';
      const action = {
        type: GET_USUARIO,
        payload: { idUsuario: usuario.idUsuario },
        stage: FAILURE_RECEIVED,
      };
      expect(reducer(state, action)).toBe(state);
    });
  });
});
