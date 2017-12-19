import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Checkbox,
  Button,
} from 'react-bootstrap';

import { login } from '../../store/actions';
import { selUsuarioActivo } from '../../store/selectors';

import isPlainClick from '../utils/isPlainClick';

import { withRouterTypes, usuarioShape } from '../../shapes';

export class LoginForm extends Component {
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
              placeholder="usuario"
              value={this.state.usuario}
              onChange={this.usuarioChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalPassword"
          validationState={this.validatePassword()}
        >
          <Col componentClass={ControlLabel} mdOffset={2} md={2} xs={3}>
            Password
          </Col>
          <Col md={6} xs={9}>
            <FormControl
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.passwordChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col mdOffset={4} md={6} xsOffset={3} xs={9}>
            <Checkbox>Remember me</Checkbox>
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

export const mapStateToProps = state => ({ usuario: selUsuarioActivo(state) });

export const mapDispatchToProps = (dispatch, { history }) => ({
  onLogin: async (username, password) => {
    await dispatch(login(username, password));
    await history.goBack();
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(LoginForm);
