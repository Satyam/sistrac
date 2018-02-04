import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from '@devasatyam/controls/lib/Grid';
import MainNav from '_connectors/MainNav';
import Routes from '_components/Routes';
import { withRouterTypes, usuarioShape } from '_src/shapes';

import {
  STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  STATUS_LOGGED_OUT,
  // STATUS_LOGGED_IN,
  // STATUS_GETTING_CURRENT_USER,
} from '_store/usuarios/reducer';

export default class App extends Component {
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
  shouldComponentUpdate(nextProps, nextState) {
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
