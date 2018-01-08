import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  NavItem as RawNavItem,
} from 'react-bootstrap';

import { NavItem, MenuItem } from '_components/BootstrapLink';

import {
  // STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  // STATUS_LOGGED_IN,
  // STATUS_GETTING_CURRENT_USER,
  // STATUS_LOGGED_OUT,
} from '_store/usuarios/reducer';

import { withRouterTypes, usuarioShape } from '_src/shapes';

import './styles.css';
export default function MainNav({ usuario, statusUsuario, location }) {
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
          <RawNavItem eventKey={2} href="http://localhost:8080/graphiql">
            graphiql
          </RawNavItem>
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
