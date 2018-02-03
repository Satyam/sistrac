import React from 'react';
import PropTypes from 'prop-types';

import { fieldInputPropTypes } from 'redux-form/es/propTypes';

import './styles.css';

const Checkbox = ({ placeholder, rxfProps, ...props }) => (
  <div className="form-check">
    <input
      {...props}
      {...rxfProps}
      className="form-check-input"
      type="checkbox"
    />
    {placeholder && <span className="form-check-label">{placeholder}</span>}
  </div>
);

Checkbox.propTypes = {
  placeholder: PropTypes.node,
  rxfProps: PropTypes.shape(fieldInputPropTypes),
};

export default Checkbox;
