import React from 'react';

import { Button } from '@devasatyam/controls/lib/Button';
import Form from '@devasatyam/controls/lib/Form';

import { withRouterTypes, usuarioShape } from '_src/shapes';

const LoginForm = ({ onLogin, usuario: { usuario } }) => {
  const formSubmit = values => {
    const { usuario, password } = values;
    onLogin(usuario, password);
  };
  return (
    <Form
      name="login"
      onSubmit={formSubmit}
      initialValues={{
        usuario,
      }}
    >
      <Form.Field type="text" name="usuario" placeholder="usuario">
        <Form.Label>Usuario</Form.Label>
        <Form.Help>ayuda</Form.Help>
      </Form.Field>
      <Form.Field type="password" name="password" placeholder="contraseña">
        <Form.Label>Contraseña</Form.Label>
        <Form.Help>ayuda</Form.Help>
      </Form.Field>
      <Form.Field type="buttonGroup">
        <Button type="submit" color="primary">
          Sign in
        </Button>
      </Form.Field>
    </Form>
  );
};

LoginForm.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};
export default LoginForm;
