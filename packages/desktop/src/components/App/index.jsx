import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { compose } from 'recompose';

import loadModule from '../utils/moduleLoader';
import { selUsuarioActivo } from '../../store/selectors';

export class App extends Component {
  checkLoggedIn = () => {
    const { usuario, history, location } = this.props;
    if (location.pathname !== '/login' && !usuario.idUsuario) {
      history.push('/login');
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
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Sistrac</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/estaciones">
              Estaciones
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Route
          path="/estaciones"
          component={loadModule(() =>
            import(/* webpackChunkName: "estaciones" */ '../Estaciones'),
          )}
        />
        <Route
          path="/login"
          component={loadModule(() =>
            import(/* webpackChunkName: "login" */ '../LoginForm'),
          )}
        />
      </div>
    );
  }
}

export const mapStateToProps = state => ({ usuario: selUsuarioActivo(state) });

export default compose(withRouter, connect(mapStateToProps))(App);
