import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formShape from './formShape';

class Form extends Component {
  onChange = (name, value, ev) => {};
  onBlur = (name, value, ev) => {};
  getChildContext = () => {
    return {
      form: { onChange: this.onChange, onBlur: this.onBlur },
    };
  };
  render() {
    return this.props.children;
  }
}

Form.propTypes = {
  children: PropTypes.node,
};

Form.childContextTypes = formShape;

export default Form;
