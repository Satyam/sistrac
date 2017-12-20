import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { NavItem, MenuItem } from '../BootstrapLink';
import { selUsuarioActivo } from '../../store/selectors';

import { withRouterTypes, usuarioShape } from '../../shapes';

import './styles.css';
export function MainNav({ usuario, location }) {
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
            <NavDropdown eventKey={3} title={usuario.nombre} id="userDropdown">
              <MenuItem href="/logout">Logout</MenuItem>
              <MenuItem href="/preferences">Preferences</MenuItem>
            </NavDropdown>
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

export const mapStateToProps = state => ({ usuario: selUsuarioActivo(state) });

export default compose(withRouter, connect(mapStateToProps))(MainNav);
