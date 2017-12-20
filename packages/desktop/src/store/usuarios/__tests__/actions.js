import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import promiseMiddleware from '../../utils/promiseMiddleware';

import { REST_PORT, REST_HOST, REST_API_PATH } from '../../../config';

import { LOGIN, LOGOUT } from '../constants';
import { login, logout } from '../actions';
import {
  REPLY_RECEIVED,
  REQUEST_SENT,
  FAILURE_RECEIVED,
} from '../../utils/promiseMiddleware';

const HOST = `${REST_HOST}:${REST_PORT}${REST_API_PATH}/usuarios`;

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

describe('usuarios actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  describe('login', () => {
    it('should be a function with two arguments', () => {
      expect(typeof login).toBe('function');
      expect(login.length).toBe(2);
    });
    it('succeed', async () => {
      const mockStore = configureStore([reduxThunk, promiseMiddleware]);
      const store = mockStore({
        usuarios: { hash: {}, activo: null, vence: null },
      });
      fetchMock.putOnce(`${HOST}/login`, {
        body: { ...usuario, ...roles },
        headers: { 'content-type': 'application/json' },
      });
      const data = await store.dispatch(
        login(usuario.usuario, usuario.password),
      );
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: LOGIN,
        payload: { usuario: usuario.usuario, password: usuario.password },
        stage: REQUEST_SENT,
      });
      expect(actions[1]).toEqual({
        type: LOGIN,
        payload: { ...usuario, ...roles },
        stage: REPLY_RECEIVED,
      });
      expect(data).toEqual(actions[1]);
    });
    it('fail', async () => {
      const mockStore = configureStore([reduxThunk, promiseMiddleware]);
      const store = mockStore({
        usuarios: { hash: {}, activo: null, vence: null },
      });
      fetchMock.putOnce(`${HOST}/login`, {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
      const data = await store.dispatch(
        login(usuario.usuario, usuario.password),
      );
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: LOGIN,
        payload: { usuario: usuario.usuario, password: usuario.password },
        stage: REQUEST_SENT,
      });
      expect(actions[1].stage).toBe(FAILURE_RECEIVED);
      expect(actions[1].type).toBe(LOGIN);
      expect(actions[1].error).not.toBeNull();
      expect(data).toEqual(actions[1]);
    });
  });
  describe('logout', () => {
    it('should be a function with no arguments', () => {
      expect(typeof logout).toBe('function');
      expect(logout.length).toBe(0);
    });
    it('succeed', async () => {
      const mockStore = configureStore([reduxThunk, promiseMiddleware]);
      const store = mockStore({
        usuarios: { hash: {}, activo: null, vence: null },
      });
      fetchMock.getOnce(`${HOST}/logout`, {});
      const data = await store.dispatch(logout());
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: LOGOUT,
        stage: REQUEST_SENT,
      });
      expect(actions[1]).toEqual({
        type: LOGOUT,
        payload: {},
        stage: REPLY_RECEIVED,
      });
      expect(data).toEqual(actions[1]);
    });
  });
});
