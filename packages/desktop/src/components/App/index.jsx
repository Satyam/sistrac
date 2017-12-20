import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { compose } from 'recompose';

import MainNav from '../MainNav';
import Routes from '../Routes';
import { selUsuarioActivo } from '../../store/selectors';
import { logout } from '../../store/actions';

import { withRouterTypes, usuarioShape } from '../../shapes';

export class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  checkLoggedIn = () => {
    const { usuario, history, location, logout } = this.props;
    console.log(location.pathname);
    switch (location.pathname) {
      case '/login':
        break;
      case '/logout':
        if (this.state.logingOut) break;
        this.setState({ logingOut: true });
        logout();
        break;
      default:
        if (!usuario.idUsuario) {
          history.push('/login');
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

export const mapStateToProps = state => ({ usuario: selUsuarioActivo(state) });

export const mapDispatchToProps = (dispatch, { history }) => ({
  logout: async () => {
    await dispatch(logout());
    await history.replace('/');
    return null;
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
