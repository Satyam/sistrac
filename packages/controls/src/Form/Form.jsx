import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formShape from './formShape';

import { OK, WARN, ERROR } from './';

class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.values = {};
    this.originalValues = {};
    this.statuses = {};
    this.errors = {};
    this.touched = {};
    this.focused = null;
  }
  onInit = ({ type, name, fieldValue }) => {
    const value =
      typeof fieldValue !== 'undefined' ? fieldValue : this.props.values[name];
    this.values[name] = value;
    this.originalValues[name] = value;
    this.errors[name] = '';
    this.statuses[name] = OK;
    this.touched[name] = false;
    return {
      value,
      error: '',
      status: OK,
    };
  };
  onFocus = (name, ev) => {
    this.focused = name;
  };
  onChange = (name, value, ev) => {
    this.values[name] = value;
    this.touched[name] = value !== this.originalValues[name];
    const validate = this.props.validateOnChange[name];
    if (validate) {
      const [status, error] = validate(value);
      this.statuses[name] = status;
      this.errors[name] = error;
      return {
        value,
        status,
        error,
      };
    }
    return { value };
  };
  onBlur = (name, ev) => {
    this.focused = null;
    const value = this.values[name];
    const validate = this.props.validateOnBlur[name];
    if (validate) {
      const [status, error] = validate(this.values[value]);
      this.statuses[name] = status;
      this.errors[name] = error;
      return {
        value,
        status,
        error,
      };
    }
    return { value };
  };
  getChildContext = () => {
    const { render, getChildContext, ...shared } = this;
    return {
      form: shared,
    };
  };
  render() {
    return this.props.children;
  }
}

Form.propTypes = {
  children: PropTypes.node,
  values: PropTypes.object,
  validateOnChange: PropTypes.objectOf(PropType.func),
  validateOnBlur: PropTypes.objectOf(PropType.func),
  onSubmit: PropTypes.func,
};

Form.childContextTypes = formShape;

export default Form;
