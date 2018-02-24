import React from 'react';
import { Subscribe } from 'unstated';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import usuariosStore from '_store/usuarios';
import App from '_components/App';

const connect = BaseComp => otherProps => (
  <Subscribe to={[usuariosStore]}>
    {usuarios => {
      const props = {
        usuario: usuarios.selUsuarioActivo(),
        statusUsuario: usuarios.selStatusUsuario(),
        logout: () => usuarios.logout(),
        getUsuarioActual: () => usuarios.getUsuarioActual(),
      };
      return <BaseComp {...otherProps} {...props} />;
    }}
  </Subscribe>
);

export default compose(withRouter, connect)(App);
