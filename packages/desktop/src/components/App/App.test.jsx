import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from '../../store/utils/promiseMiddleware';
import ConnectedApp, { App, mapStateToProps, mapDispatchToProps } from '.';
import fetchMock from 'fetch-mock';

import { REST_PORT, REST_HOST, REST_API_PATH } from '../../config';

import { LOGOUT } from '../../store/usuarios/constants';
import {
  REPLY_RECEIVED,
  REQUEST_SENT,
} from '../../store/utils/promiseMiddleware';

const HOST = `${REST_HOST}:${REST_PORT}${REST_API_PATH}/usuarios`;
const mockStore = configureStore([reduxThunk, promiseMiddleware]);

describe('App component', () => {
  describe('raw component', () => {
    it('should render (shallow)', () => {
      const wrapper = shallow(<App />, { disableLifecycleMethods: true });
      expect(wrapper).toMatchSnapshot();
    });
    it('should render a blank screen when there is a user', () => {
      const props = {
        usuario: { idUsuario: 20 },
        history: {},
        location: {
          pathname: '/',
        },
      };
      const wrapper = shallow(<App {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('should push to /login when no user given', () => {
      const mockStore = configureStore([reduxThunk, promiseMiddleware]);
      const store = mockStore({
        usuarios: { hash: {}, activo: null, vence: null },
      });
      const push = jest.fn();
      const props = {
        usuario: {},
        history: { push },
        location: {
          pathname: '/',
        },
      };
      mount(
        <Provider store={store}>
          <Router>
            <App {...props} />
          </Router>
        </Provider>,
      );
      expect(push.mock.calls.length).toBe(1);
      expect(push.mock.calls[0][0]).toBe('/login');
    });
  });
  describe('mapStateToProps', () => {
    it('should return logged in user', () => {
      const usuario = {
        idUsuario: 20,
        usuario: 'pepe',
        password: '123456789',
        nombre: 'José Pérez',
      };
      const store = mockStore({
        usuarios: {
          hash: { [usuario.idUsuario]: usuario },
          activo: usuario.idUsuario,
          vence: Date.now() + 9999,
        },
      });
      const props = mapStateToProps(store.getState(), {});
      expect(props).toEqual({
        usuario,
      });
      expect(store.getActions().length).toBe(0);
    });
    it('should return nothing when user not logged', () => {
      const store = mockStore({
        usuarios: { hash: {}, activo: null, vence: null },
      });
      const props = mapStateToProps(store.getState(), {});
      expect(props).toEqual({
        usuario: {},
      });
      expect(store.getActions().length).toBe(0);
    });
  });
  describe('mapDispatchToProps', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });
    it('provide logout prop', async () => {
      const store = mockStore({
        usuarios: { hash: {}, activo: null, vence: null },
      });
      const replace = jest.fn();
      fetchMock.getOnce(`${HOST}/logout`, {});
      const props = mapDispatchToProps(store.dispatch, {
        history: {
          replace,
        },
      });
      expect(typeof props.logout).toBe('function');
      await props.logout();
      const actions = store.getActions();
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
  });
});
