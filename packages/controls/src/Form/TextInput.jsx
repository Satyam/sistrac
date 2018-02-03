import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const TextInput = ({ rows, ...props }) =>
  rows ? (
    <textarea {...props} rows={rows} className="form-control" />
  ) : (
    <input {...props} className="form-control" />
  );

TextInput.propTypes = {
  rows: PropTypes.number,
};

export default TextInput;
