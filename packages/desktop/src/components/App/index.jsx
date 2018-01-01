import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { compose } from 'recompose';

import MainNav from '_components/MainNav';
import Routes from '_components/Routes';
import { selUsuarioActivo, selStatusUsuario } from '_store/selectors';
import { logout, getUsuarioActual } from '_store/actions';

import { withRouterTypes, usuarioShape } from '_src/shapes';

import {
  STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  STATUS_LOGGED_OUT,
  // STATUS_LOGGED_IN,
  // STATUS_GETTING_CURRENT_USER,
} from '_store/usuarios/reducer';

export class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  checkLoggedIn = () => {
    const {
      usuario,
      location,
      logout,
      statusUsuario,
      getUsuarioActual,
      history,
    } = this.props;
    switch (location.pathname) {
      case '/login':
        break;
      case '/logout':
        if (this.state.logingOut) break;
        this.setState({ logingOut: true });
        logout();
        break;
      default:
        switch (statusUsuario) {
          case STATUS_INITIAL:
            if (!usuario.idUsuario) {
              getUsuarioActual();
            }
            break;
          case STATUS_LOGGED_OUT:
          case STATUS_UNAUTHORIZED:
            history.push('/login');
            break;
          // case STATUS_LOGGED_IN:
          // case STATUS_GETTING_CURRENT_USER:
          default:
            break;
        }
    }
  };
  componentDidMount = () => {
    this.checkLoggedIn();
  };
  componentDidUpdate = () => {
    this.checkLoggedIn();
  };
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Sistrac</title>
        </Helmet>
        <MainNav />
        <Routes />
      </div>
    );
  }
}

App.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};

export const mapStateToProps = state => ({
  usuario: selUsuarioActivo(state),
  statusUsuario: selStatusUsuario(state),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  logout: async () => {
    await dispatch(logout());
    await history.replace('/');
    return null;
  },
  getUsuarioActual: async () => await dispatch(getUsuarioActual()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
