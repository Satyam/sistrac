import React, { Component } from 'react';

import { Button } from '@devasatyam/controls/lib/Button';
import Form from '@devasatyam/controls/lib/Form';
import isPlainClick from '_components/utils/isPlainClick';

import { withRouterTypes, usuarioShape } from '_src/shapes';

export default class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { usuario: props.usuario.usuario || '', password: '' };
  }

  usuarioChange = ev => {
    this.setState({ usuario: ev.target.value });
  };
  validateUsuario = () => {
    const usuario = this.state.usuario;
    if (usuario.length < 3) {
      return 'warning';
    }
    return 'success';
  };
  passwordChange = ev => {
    this.setState({ password: ev.target.value });
  };
  validatePassword = () => {
    const password = this.state.password;
    if (password.length < 3) {
      return 'warning';
    }
    return 'success';
  };
  formSubmit = ev => {
    if (isPlainClick(ev)) {
      if (this.validatePassword() !== 'success') return;
      if (this.validateUsuario() !== 'success') return;
      const { usuario, password } = this.state;
      this.props.onLogin(usuario, password);
    }
  };
  render() {
    return (
      <Form>
        <Form.Field
          type="text"
          name="usuario"
          value={this.state.usuario}
          onChange={this.usuarioChange}
          placeholder="usuario"
        >
          <Form.Label>Usuario</Form.Label>
          <Form.Help>ayuda</Form.Help>
        </Form.Field>
        <Form.Field
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.passwordChange}
          placeholder="contraseña"
        >
          <Form.Label>Contraseña</Form.Label>
          <Form.Help>ayuda</Form.Help>
        </Form.Field>
        <Form.Field type="buttonGroup">
          <Button type="submit" onClick={this.formSubmit} color="primary">
            Sign in
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};
