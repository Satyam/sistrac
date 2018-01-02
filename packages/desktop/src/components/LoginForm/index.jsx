import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Button,
} from 'react-bootstrap';

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
      <Form horizontal>
        <FormGroup controlId="usuario" validationState={this.validateUsuario()}>
          <Col componentClass={ControlLabel} mdOffset={2} md={2} xs={3}>
            Usuario
          </Col>
          <Col md={6} xs={9}>
            <FormControl
              type="text"
              placeholder="Usuario"
              value={this.state.usuario}
              onChange={this.usuarioChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup
          controlId="password"
          validationState={this.validatePassword()}
        >
          <Col componentClass={ControlLabel} mdOffset={2} md={2} xs={3}>
            Password
          </Col>
          <Col md={6} xs={9}>
            <FormControl
              type="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.passwordChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col mdOffset={4} md={6} xsOffset={3} xs={9}>
            <Button type="submit" onClick={this.formSubmit}>
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  ...withRouterTypes,
  usuario: usuarioShape,
};
