import React from 'react';
import { Subscribe } from 'unstated';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import usuariosStore from '_store/usuarios';
import LoginForm from '_components/LoginForm';

const connect = BaseComp => otherProps => (
  <Subscribe to={[usuariosStore]}>
    {usuarios => {
      const props = {
        usuario: usuarios.selUsuarioActivo(),
        onLogin: (username, password) => usuarios.login(username, password),
      };
      return <BaseComp {...otherProps} {...props} />;
    }}
  </Subscribe>
);

export default compose(withRouter, connect)(LoginForm);
