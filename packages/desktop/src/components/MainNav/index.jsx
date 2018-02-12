import React, { Fragment } from 'react';

import NavBar from '@devasatyam/controls/lib/NavBar';
import Person from 'react-icons/lib/go/person';
import Stop from 'react-icons/lib/go/stop';
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
    <Fragment>
      <NavBar
        brand="Sistract"
        href="/"
        position="top"
        breakpoint="md"
        background="light"
      >
        <NavBar.Menu>
          <NavBar.Item href="/estaciones">Estaciones</NavBar.Item>
          <NavBar.Item href="http://localhost:8080/graphiql" external>
            graphiql
          </NavBar.Item>
        </NavBar.Menu>
        <NavBar.Menu right>
          {usuario.nombre ? (
            <NavBar.Dropdown label={usuario.nombre} icon={<Person />}>
              <NavBar.DropdownItem href="/logout">Logout</NavBar.DropdownItem>
              <NavBar.DropdownItem href="/preferences">
                Preferences
              </NavBar.DropdownItem>
            </NavBar.Dropdown>
          ) : statusUsuario === STATUS_UNAUTHORIZED ? (
            <NavBar.Item className="unauthorized">
              <Stop /> No autorizado
            </NavBar.Item>
          ) : null}
        </NavBar.Menu>
      </NavBar>
    </Fragment>
  );
}

MainNav.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};
