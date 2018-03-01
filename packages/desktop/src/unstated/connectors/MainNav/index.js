// @flow
import connect from '_connectors/utils/connect';
import type { MapProps } from '_connectors/utils/connect';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import usuariosStore from '_store/usuarios';
import MainNav from '_components/MainNav';

export const mapProps: MapProps = (usuarios: usuariosStore) => ({
  usuario: usuarios.selUsuarioActivo(),
  statusUsuario: usuarios.selStatusUsuario(),
});

export default compose(withRouter, connect(usuariosStore, mapProps))(MainNav);
