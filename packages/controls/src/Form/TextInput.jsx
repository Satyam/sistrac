import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form/es/propTypes';
import './styles.css';

const TextInput = ({ rows, rxfProps, ...props }) =>
  rows ? (
    <textarea {...props} {...rxfProps} rows={rows} className="form-control" />
  ) : (
    <input {...props} {...rxfProps} className="form-control" />
  );

TextInput.propTypes = {
  rows: PropTypes.number,
  rxfProps: PropTypes.shape(fieldInputPropTypes),
};

export default TextInput;
