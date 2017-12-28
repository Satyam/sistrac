import reducer from '../reducer';
import { LOGIN, LOGOUT, GET_USUARIO, GET_USUARIO_ACTUAL } from '../constants';
import {
  REPLY_RECEIVED,
  REQUEST_SENT,
  FAILURE_RECEIVED,
} from '../../utils/promiseMiddleware';

import { SESSION_TIMEOUT } from '../../../config';

import {
  STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  STATUS_LOGGED_OUT,
  STATUS_LOGGED_IN,
  STATUS_GETTING_CURRENT_USER,
} from '../reducer';

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
      status: STATUS_INITIAL,
    };
    expect(reducer(state, action)).toEqual(newState);
  });
  it('should do nothing', () => {
    const state = 'whatever';
    const action = {};
    expect(reducer(state, action)).toBe(state);
  });
  it('on any unknown reply received', () => {
    const state = 'whatever';
    const action = { type: 'xxxx', stage: REPLY_RECEIVED };
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
      status: STATUS_LOGGED_IN,
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
      status: STATUS_LOGGED_OUT,
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
    it('logged out by timeout', () => {
      const state = {};
      const action = {
        type: 'xxxxxx',
        stage: FAILURE_RECEIVED,
        error: 401, // Unauthorized
      };
      const newState = {
        activo: null,
        status: STATUS_UNAUTHORIZED,
        prevStatus: null,
        vence: null,
      };
      expect(reducer(state, action)).toEqual(newState);
    });
    it('marking it is in the process of getting the current user', () => {
      const state = {};
      const action = {
        type: GET_USUARIO_ACTUAL,
        stage: REQUEST_SENT,
      };
      const newState = { status: STATUS_GETTING_CURRENT_USER };
      expect(reducer(state, action)).toEqual(newState);
    });
    it('got the current user', () => {
      const state = { status: STATUS_GETTING_CURRENT_USER };
      const action = {
        type: GET_USUARIO_ACTUAL,
        stage: REPLY_RECEIVED,
        payload: { ...usuario, ...roles },
      };
      const newState = {
        activo: usuario.idUsuario,
        hash: {
          [usuario.idUsuario]: { ...usuario, ...roles },
        },
        vence: Date.now() + SESSION_TIMEOUT * 1000,
        status: STATUS_LOGGED_IN,
      };
      expect(reducer(state, action)).toEqual(newState);
    });
  });
});
