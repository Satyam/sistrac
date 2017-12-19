import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import Connected, { App, mapStateToProps } from '.';

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
      const push = jest.fn();
      const props = {
        usuario: {},
        history: { push },
        location: {
          pathname: '/',
        },
      };
      mount(
        <Router>
          <App {...props} />
        </Router>,
      );
      expect(push.mock.calls.length).toBe(1);
      expect(push.mock.calls[0][0]).toBe('/login');
    });
  });
});
