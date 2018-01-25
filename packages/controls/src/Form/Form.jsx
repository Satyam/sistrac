import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formShape from './formShape';

class Form extends Component {
  getChildContext = () => {
    return {
      form: {},
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
