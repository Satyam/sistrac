// @flow
import connect from '_connectors/utils/connect';
import type { MapProps } from '_connectors/utils/connect';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import usuariosStore from '_store/usuarios';
import LoginForm from '_components/LoginForm';

export const mapProps: MapProps<usuariosStore> = usuarios => ({
  usuario: usuarios.selUsuarioActivo(),
  onLogin: (username: string, password: string) =>
    usuarios.login(username, password),
});

export default compose(withRouter, connect(usuariosStore, mapProps))(LoginForm);
