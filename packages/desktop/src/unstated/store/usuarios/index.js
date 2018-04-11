// @flow
import { Container } from 'unstated';
import restAPI from '_store/utils/restAPI';
import indexBy from '_store/utils/indexBy';

import {
  NAME,
  STATUS_INITIAL,
  STATUS_UNAUTHORIZED,
  STATUS_LOGGED_IN,
  STATUS_GETTING_CURRENT_USER,
  STATUS_LOGGED_OUT,
} from './constants';

const api = restAPI(NAME);

type UsuariosState = {
  hash: { [IdUsuario]: Usuario },
  activo: ?IdUsuario,
  vence: ?number,
  status: Usuario_Status,
  prevStatus: ?number,
};
export default class Usuarios extends Container<UsuariosState> {
  // these are mostly like the reducers
  state = {
    hash: {},
    activo: null,
    vence: null,
    status: STATUS_INITIAL,
    prevStatus: null,
  };
  failureReceived = (err: Error): void => {
    if (err.code === 401) {
      this.noUsuarioActual();
    } else throw err;
  };
  noUsuarioActual(): void {
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
  usuarioActualRequested = (): void => {
    this.setState({
      status: STATUS_GETTING_CURRENT_USER,
      prevStatus: this.state.status,
    });
  };
  usuariosRequested = (idUsuarios: Array<IdUsuario>): void => {
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
  usuariosRead = (usuarios: Array<Usuario>): Array<Usuario> => {
    this.setState({
      hash: indexBy(usuarios, 'idUsuario', this.state.hash),
    });
    return usuarios;
  };
  loggedIn = (usuario: Usuario): Usuario => {
    const { idUsuario } = usuario;
    this.setState({
      activo: idUsuario,
      vence: Date.now() + process.env.REACT_APP_SESSION_TIMEOUT * 1000,
      hash: { ...this.state.hash, [idUsuario]: usuario },
      status: STATUS_LOGGED_IN,
    });
    return usuario;
  };
  loggedOut = (): void => {
    this.setState({
      activo: null,
      vence: null,
      status: STATUS_LOGGED_OUT,
    });
  };

  // these are mostly like actions:
  login(usuario: string, password: string): Promise<Usuario> {
    return api
      .update('/login', { usuario, password })
      .then(this.loggedIn)
      .catch(this.failureReceived);
  }
  logout(): Promise<void> {
    return api
      .read('/logout')
      .then(this.loggedOut)
      .catch(this.failureReceived);
  }
  getUsuarioActual(): Promise<Usuario> {
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
  getUsuarios(usuarios: Array<IdUsuario>): Promise<Array<Usuario>> {
    let faltantes = [];
    if (usuarios) {
      faltantes = usuarios.filter(idUsuario => !this.state.hash[idUsuario]);
      if (!faltantes.length) return Promise.resolve([]);
      this.usuariosRequested(faltantes);
    }
    return api
      .read(`/${faltantes.join(',')}`)
      .then(this.usuariosRead)
      .catch(this.failureReceived);
  }

  // and these, the selectors:
  selUsuarioActivo(): Usuario | Object {
    const { activo, vence, hash } = this.state;

    if (vence && vence < Date.now()) return {};
    if (!activo) return {};
    return hash[activo];
  }
  selStatusUsuario(): number {
    return this.state.status;
  }
  selUsuario(idUsuario: IdUsuario): Usuario {
    return this.state.hash[idUsuario];
  }
}
