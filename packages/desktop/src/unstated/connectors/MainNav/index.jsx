import React from 'react';
import { Subscribe } from 'unstated';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import usuariosStore from '_store/usuarios';
import MainNav from '_components/MainNav';

const connect = BaseComp => otherProps => (
  <Subscribe to={[usuariosStore]}>
    {usuarios => {
      const props = {
        usuario: usuarios.selUsuarioActivo(),
        statusUsuario: usuarios.selStatusUsuario(),
      };
      return <BaseComp {...otherProps} {...props} />;
    }}
  </Subscribe>
);

export default compose(withRouter, connect)(MainNav);
