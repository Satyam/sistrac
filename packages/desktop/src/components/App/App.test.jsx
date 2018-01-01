import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from '_store/utils/promiseMiddleware';
import { App, mapStateToProps, mapDispatchToProps } from '.';
import fetchMock from 'fetch-mock';

import { REST_PORT, REST_HOST, REST_API_PATH } from '_src/config';

import { LOGOUT, GET_USUARIO_ACTUAL } from '_store/usuarios/constants';
import { REPLY_RECEIVED, REQUEST_SENT } from '_store/utils/promiseMiddleware';

import {
  STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  STATUS_LOGGED_OUT,
  STATUS_LOGGED_IN,
  // STATUS_GETTING_CURRENT_USER,
} from '_store/usuarios/reducer';

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

describe('App component', () => {
  afterEach(() => {
    noUserStore.clearActions();
    pepeStore.clearActions();
    emptyStore.clearActions();
  });
  describe('raw component', () => {
    const push = jest.fn();
    const getUsuarioActual = jest.fn();
    const logout = jest.fn();
    const initialProps = {
      usuario: {},
      statusUsuario: STATUS_INITIAL,
      history: { push },
      location: {
        pathname: '/',
      },
      getUsuarioActual,
      logout,
    };

    afterEach(() => {
      push.mockClear();
      getUsuarioActual.mockClear();
      logout.mockClear();
    });

    it('should render (shallow)', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a blank screen when there is a user', () => {
      const props = {
        usuario,
        statusUsuario: STATUS_LOGGED_IN,
        history: {},
        location: {
          pathname: '/',
        },
      };
      const wrapper = shallow(<App {...props} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should try to recover the current user when no user given', () => {
      mount(
        <Provider store={noUserStore}>
          <Router>
            <App {...initialProps} />
          </Router>
        </Provider>,
      );
      expect(getUsuarioActual.mock.calls.length).toBe(1);
      expect(push.mock.calls.length).toBe(0);
      expect(logout.mock.calls.length).toBe(0);
    });

    it('should show the login screen', () => {
      const props = {
        ...initialProps,
        location: {
          pathname: '/login',
        },
      };
      mount(
        <Provider store={noUserStore}>
          <Router>
            <App {...props} />
          </Router>
        </Provider>,
      );
      expect(getUsuarioActual.mock.calls.length).toBe(0);
      expect(push.mock.calls.length).toBe(0);
      expect(logout.mock.calls.length).toBe(0);
    });

    it('user already logged in', () => {
      const push = jest.fn();
      const getUsuarioActual = jest.fn();
      const props = {
        ...initialProps,
        usuario,
      };
      mount(
        <Provider store={noUserStore}>
          <Router>
            <App {...props} />
          </Router>
        </Provider>,
      );
      expect(getUsuarioActual.mock.calls.length).toBe(0);
      expect(push.mock.calls.length).toBe(0);
      expect(logout.mock.calls.length).toBe(0);
    });

    it('logging out', () => {
      const props = {
        ...initialProps,
        usuario: {},
        statusUsuario: STATUS_LOGGED_IN,
        location: {
          pathname: '/logout',
        },
      };
      mount(
        <Provider store={noUserStore}>
          <Router>
            <App {...props} />
          </Router>
        </Provider>,
      );
      expect(getUsuarioActual.mock.calls.length).toBe(0);
      expect(push.mock.calls.length).toBe(0);
      expect(logout.mock.calls.length).toBe(1);
    });

    it('should push to /login when unauthorized', () => {
      const props = {
        ...initialProps,
        statusUsuario: STATUS_UNAUTHORIZED,
      };
      mount(
        <Provider store={noUserStore}>
          <Router>
            <App {...props} />
          </Router>
        </Provider>,
      );
      expect(push.mock.calls.length).toBe(1);
      expect(push.mock.calls[0][0]).toBe('/login');
      expect(getUsuarioActual.mock.calls.length).toBe(0);
      expect(logout.mock.calls.length).toBe(0);
    });

    it('should push to /login when logged out', () => {
      const props = {
        ...initialProps,
        statusUsuario: STATUS_LOGGED_OUT,
      };
      mount(
        <Provider store={noUserStore}>
          <Router>
            <App {...props} />
          </Router>
        </Provider>,
      );
      expect(push.mock.calls.length).toBe(1);
      expect(push.mock.calls[0][0]).toBe('/login');
      expect(getUsuarioActual.mock.calls.length).toBe(0);
      expect(logout.mock.calls.length).toBe(0);
    });
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
      const replace = jest.fn();
      fetchMock.getOnce(`${HOST}/logout`, {});
      const props = mapDispatchToProps(emptyStore.dispatch, {
        history: {
          replace,
        },
      });
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
      const calls = replace.mock.calls;
      expect(calls.length).toBe(1);
      expect(calls[0][0]).toBe('/');
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
