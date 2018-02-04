import React from 'react';
import { Row, Col } from '@devasatyam/controls/lib/Grid';

import { Button } from '@devasatyam/controls/lib/Button';
import Form from '@devasatyam/controls/lib/Form';

import { withRouterTypes, usuarioShape } from '_src/shapes';

const LoginForm = ({ onLogin, usuario: { usuario } }) => {
  const formSubmit = values => {
    const { usuario, password } = values;
    return onLogin(usuario, password);
  };
  return (
    <Row>
      <Col xs={12} md={8} mdOffset={2}>
        <Form
          name="login"
          onSubmit={formSubmit}
          initialValues={{
            usuario,
          }}
        >
          <Form.Field type="text" name="usuario" placeholder="usuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Help>Ingrese el nombre de usuario</Form.Help>
          </Form.Field>
          <Form.Field type="password" name="password" placeholder="contraseña">
            <Form.Label>Contraseña</Form.Label>
            <Form.Help>Ingrese la contraseña</Form.Help>
          </Form.Field>
          <Form.Field type="buttonGroup">
            <Button type="submit" color="primary">
              Ingresar
            </Button>
          </Form.Field>
        </Form>
      </Col>
    </Row>
  );
};

LoginForm.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};
export default LoginForm;
