// @flow
import connect from '_connectors/utils/connect';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import usuariosStore from '_store/usuarios';
import App from '_components/App';

export const mapProps = (usuarios: usuariosStore) => ({
  usuario: usuarios.selUsuarioActivo(),
  statusUsuario: usuarios.selStatusUsuario(),
  logout: () => usuarios.logout(),
  getUsuarioActual: () => usuarios.getUsuarioActual(),
});

export default compose(withRouter, connect(usuariosStore, mapProps))(App);
