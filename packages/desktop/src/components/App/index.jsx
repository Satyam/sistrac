// @flow
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from '@devasatyam/react-bootstrap-4-controls';
import MainNav from '_connectors/MainNav';
import Routes from '_components/Routes';
import { withRouterTypes, usuarioShape } from '_src/shapes';
import type {
  RouterHistory,
  Location as RouterLocation,
} from 'react-router-dom';

import {
  STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  STATUS_LOGGED_OUT,
  // STATUS_LOGGED_IN,
  // STATUS_GETTING_CURRENT_USER,
} from '_store/usuarios/constants';

import './styles.css';

type AppProps = {
  usuario: Usuario,
  location: RouterLocation,
  history: RouterHistory,
  logout: Usuario_Logout,
  statusUsuario: Usuario_Status,
  getUsuarioActual: Usuario_GetUsuarioActual,
};
type AppState = {
  logingOut: boolean,
};
export default class App extends Component<AppProps, AppState> {
  state = { logingOut: false };
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
        logout().then(() => history.replace('/'));
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
  shouldComponentUpdate(nextProps: AppProps) {
    return (
      this.props.statusUsuario !== nextProps.statusUsuario ||
      this.props.location.pathname !== nextProps.location.pathname
    );
  }
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Sistrac</title>
        </Helmet>
        <MainNav />
        <Grid>
          <Routes />
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};
