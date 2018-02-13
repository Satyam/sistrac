import React from 'react';

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
    <NavBar
      brand="Sistract"
      href="/"
      position="top"
      breakpoint="md"
      background="light"
    >
      <NavBar.Group>
        <NavBar.Button href="/estaciones">Estaciones</NavBar.Button>
        <NavBar.Button href="http://localhost:8080/graphiql" external>
          graphiql
        </NavBar.Button>
      </NavBar.Group>
      <NavBar.Group right>
        {usuario.nombre ? (
          <NavBar.Menu label={usuario.nombre} icon={<Person />}>
            <NavBar.Item href="/logout">Logout</NavBar.Item>
            <NavBar.Item href="/preferences">Preferences</NavBar.Item>
          </NavBar.Menu>
        ) : statusUsuario === STATUS_UNAUTHORIZED ? (
          <NavBar.Button className="unauthorized">
            <Stop /> No autorizado
          </NavBar.Button>
        ) : null}
      </NavBar.Group>
    </NavBar>
  );
}

MainNav.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};
