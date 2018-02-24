import React from 'react';

import { Form, Field } from '@devasatyam/controls/lib/Form';
import { Button } from '@devasatyam/controls/lib/Button';

import { Row, Col } from '@devasatyam/controls/lib/Grid';

import { withRouterTypes, usuarioShape } from '_src/shapes';

const LoginForm = ({ onLogin, usuario, history }) => {
  const formSubmit = async values => {
    const { usuario, password } = values;
    await onLogin(usuario, password);
    history.goBack();
  };

  const validate = ({ usuario, password }) => {
    const errors = {};
    if (!usuario) {
      errors.usuario = 'No puede estar vacío';
    }
    if (!password) {
      errors.password = 'No puede estar vacío';
    }
    return errors;
  };

  return (
    <Row>
      <Col xs={12} md={8} mdOffset={2}>
        <Form
          onSubmit={formSubmit}
          initialValues={{
            usuario: usuario.usuario || '',
            password: '',
          }}
          validate={validate}
          suscription={{ invalid: true, pristine: true, submitting: true }}
          render={({ handleSubmit, submitting, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Field
                type="text"
                name="usuario"
                placeholder="usuario"
                label="Usuario"
                help="Ingrese el nombre de usuario"
              />
              <Field
                type="password"
                name="password"
                placeholder="contraseña"
                label="Contraseña"
                help="Ingrese la contraseña"
              />
              <Field type="buttonGroup">
                <Button
                  type="submit"
                  color="primary"
                  disabled={submitting || invalid || pristine}
                >
                  Ingresar
                </Button>
              </Field>
            </form>
          )}
        />
      </Col>
    </Row>
  );
};
LoginForm.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};
export default LoginForm;
