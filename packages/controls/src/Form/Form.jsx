import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { OK, WARN, ERROR } from './';

class Form extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return this.props.children;
  }
}

Form.propTypes = {
  children: PropTypes.node,
  values: PropTypes.object,
  validateOnChange: PropTypes.objectOf(PropTypes.func),
  validateOnBlur: PropTypes.objectOf(PropTypes.func),
  onSubmit: PropTypes.func,
};

export default Form;
