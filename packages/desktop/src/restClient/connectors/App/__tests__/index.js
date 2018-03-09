import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from '_store/utils/promiseMiddleware';

import { REST_PORT, REST_HOST, REST_API_PATH } from '_src/config';

import { LOGOUT, GET_USUARIO_ACTUAL } from '_store/usuarios/constants';
import { REPLY_RECEIVED, REQUEST_SENT } from '_store/utils/promiseMiddleware';
import {
  STATUS_LOGGED_OUT,
  // STATUS_GETTING_CURRENT_USER,
} from '_store/usuarios/constants';

import { mapStateToProps, mapDispatchToProps } from '..';

const HOST = `${REST_HOST}:${REST_PORT}${REST_API_PATH}/usuarios`;
const mockStore = configureStore([reduxThunk, promiseMiddleware]);

const usuario = {
  idUsuario: 20,
  usuario: 'pepe',
  password: '123456789',
  nombre: 'José Pérez',
};

const pepeStore = mockStore({
  usuarios: {
    hash: { [usuario.idUsuario]: usuario },
    activo: usuario.idUsuario,
    vence: Date.now() + 9999,
    statusUsuario: STATUS_LOGGED_OUT,
  },
});
const noUserStore = mockStore({
  usuarios: { hash: {}, activo: null, vence: null },
});
const emptyStore = mockStore();

describe('App REST Connector', () => {
  afterEach(() => {
    noUserStore.clearActions();
    pepeStore.clearActions();
    emptyStore.clearActions();
  });
  describe('mapStateToProps', () => {
    it('should return logged in user', () => {
      const props = mapStateToProps(pepeStore.getState(), {});
      expect(props).toEqual({
        usuario,
      });
      expect(pepeStore.getActions().length).toBe(0);
    });

    it('should return nothing when user not logged', () => {
      const props = mapStateToProps(noUserStore.getState(), {});
      expect(props).toEqual({
        usuario: {},
      });
      expect(noUserStore.getActions().length).toBe(0);
    });
  });

  describe('mapDispatchToProps', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('provide logout prop', async () => {
      fetchMock.getOnce(`${HOST}/logout`, {});
      const props = mapDispatchToProps(emptyStore.dispatch, {});
      expect(typeof props.logout).toBe('function');
      await props.logout();
      const actions = emptyStore.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0]).toEqual({
        type: LOGOUT,
        stage: REQUEST_SENT,
      });
      expect(actions[1]).toEqual({
        type: LOGOUT,
        stage: REPLY_RECEIVED,
        payload: {},
      });
    });

    it('provide getUsuarioActual prop no one', async () => {
      fetchMock.getOnce(`${HOST}/__actual`, {});
      const props = mapDispatchToProps(emptyStore.dispatch, {});
      expect(typeof props.getUsuarioActual).toBe('function');
      await props.getUsuarioActual();
      const actions = emptyStore.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0]).toEqual({
        type: GET_USUARIO_ACTUAL,
        stage: REQUEST_SENT,
      });
      expect(actions[1]).toEqual({
        type: GET_USUARIO_ACTUAL,
        stage: REPLY_RECEIVED,
        payload: {},
      });
    });

    it('provide getUsuarioActual prop just pepe', async () => {
      fetchMock.getOnce(`${HOST}/__actual`, usuario);
      const props = mapDispatchToProps(emptyStore.dispatch, {});
      expect(typeof props.getUsuarioActual).toBe('function');
      await props.getUsuarioActual();
      const actions = emptyStore.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0]).toEqual({
        type: GET_USUARIO_ACTUAL,
        stage: REQUEST_SENT,
      });
      expect(actions[1]).toEqual({
        type: GET_USUARIO_ACTUAL,
        stage: REPLY_RECEIVED,
        payload: usuario,
      });
    });
  });
});
