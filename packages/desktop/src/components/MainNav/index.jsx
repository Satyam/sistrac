import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { NavItem, MenuItem } from '_components/BootstrapLink';
import { selUsuarioActivo, selStatusUsuario } from '_store/selectors';
import {
  // STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  // STATUS_LOGGED_IN,
  // STATUS_GETTING_CURRENT_USER,
  // STATUS_LOGGED_OUT,
} from '_store/usuarios/reducer';
import { withRouterTypes, usuarioShape } from '_src/shapes';

import './styles.css';
export function MainNav({ usuario, statusUsuario, location }) {
  return (
    <div className="MainNav">
      <Navbar staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Sistrac</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem
            eventKey={1}
            href="/estaciones"
            active={location.pathname === '/estaciones'}
          >
            Estaciones
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link
          </NavItem>
        </Nav>
        {usuario.nombre ? (
          <Nav pullRight>
            <NavDropdown
              eventKey={3}
              title={usuario.nombre}
              className="userDropdown"
              id="userId"
            >
              <MenuItem href="/logout">Logout</MenuItem>
              <MenuItem href="/preferences">Preferences</MenuItem>
            </NavDropdown>
          </Nav>
        ) : statusUsuario === STATUS_UNAUTHORIZED ? (
          <Nav pullRight>
            <NavItem className="unauthorized">No autorizado</NavItem>
          </Nav>
        ) : null}
      </Navbar>
    </div>
  );
}

MainNav.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};

export const mapStateToProps = state => ({
  usuario: selUsuarioActivo(state),
  statusUsuario: selStatusUsuario(state),
});

export default compose(withRouter, connect(mapStateToProps))(MainNav);
