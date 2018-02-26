import { Container } from 'unstated';
import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

import { SESSION_TIMEOUT } from '_src/config';

import {
  NAME,
  STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  STATUS_LOGGED_IN,
  STATUS_GETTING_CURRENT_USER,
  STATUS_LOGGED_OUT,
} from './constants';

const api = restAPI(NAME);

export default class Usuarios extends Container {
  // these are mostly like the reducers
  state = { hash: {}, activo: null, vence: null, status: STATUS_INITIAL };
  failureReceived = err => {
    if (err.code === 401) {
      this.noUsuarioActual();
    } else throw err;
  };
  noUsuarioActual() {
    this.setState({
      activo: null,
      vence: null,
      status:
        this.state.prevStatus === STATUS_INITIAL
          ? STATUS_LOGGED_OUT
          : STATUS_UNAUTHORIZED,
      prevStatus: null,
    });
  }
  usuarioActualRequested = () => {
    this.setState({
      status: STATUS_GETTING_CURRENT_USER,
      prevStatus: this.state.status,
    });
  };
  usuariosRequested = idUsuarios => {
    if (!idUsuarios) return;
    this.setState({
      hash: idUsuarios.reduce(
        (hash, idUsuario) => ({
          ...hash,
          [idUsuario]: { idUsuario },
        }),
        this.state.hash,
      ),
    });
  };
  usuariosRead = usuarios => {
    this.setState({
      hash: indexBy(usuarios, 'idUsuario', this.state.hash),
    });
    return usuarios;
  };
  loggedIn = usuario => {
    const { idUsuario } = usuario;
    this.setState({
      activo: idUsuario,
      vence: Date.now() + SESSION_TIMEOUT * 1000,
      hash: { ...this.state.hash, [idUsuario]: usuario },
      status: STATUS_LOGGED_IN,
    });
    return usuario;
  };
  loggedOut = () => {
    this.setState({
      activo: null,
      vence: null,
      status: STATUS_LOGGED_OUT,
    });
  };

  // these are mostly like actions:
  login(usuario, password) {
    return api
      .update('/login', { usuario, password })
      .then(this.loggedIn)
      .catch(this.failureReceived);
  }
  logout() {
    return api
      .read('/logout')
      .then(this.loggedOut)
      .catch(this.failureReceived);
  }
  getUsuarioActual() {
    this.usuarioActualRequested();
    return api
      .read('/__actual')
      .then(this.loggedIn)
      .catch(err => {
        if (err.code === 404 || err.code === 401) {
          this.noUsuarioActual();
        } else {
          throw err;
        }
      });
  }
  getUsuarios(usuarios) {
    let faltantes = [];
    if (usuarios) {
      faltantes = usuarios.filter(idUsuario => !this.state.hash[idUsuario]);
      if (!faltantes.length) return;
      this.usuariosRequested(faltantes);
    }
    return api
      .read(`/${faltantes.join(',')}`)
      .then(this.usuariosRead)
      .catch(this.failureReceived);
  }

  // and these, the selectors:
  selUsuarioActivo() {
    const { activo, vence, hash } = this.state;

    if (vence < Date.now()) return {};
    if (!activo) return {};
    return hash[activo];
  }
  selStatusUsuario() {
    return this.state.status;
  }
  selUsuario(idUsuario) {
    return this.state.hash[idUsuario];
  }
}
