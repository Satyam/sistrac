import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from '_store/utils/promiseMiddleware';
import App from '.';

import {
  STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  STATUS_LOGGED_OUT,
  STATUS_LOGGED_IN,
  // STATUS_GETTING_CURRENT_USER,
} from '_store/usuarios/reducer';

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
});
