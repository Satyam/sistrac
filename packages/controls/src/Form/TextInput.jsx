import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const TextInput = ({ rows, meta, input, ...props }) =>
  rows ? (
    <textarea {...props} {...input} rows={rows} className="form-control" />
  ) : (
    <input {...props} {...input} className="form-control" />
  );

TextInput.propTypes = {
  rows: PropTypes.number,
  meta: PropTypes.object,
  input: PropTypes.object,
};

export default TextInput;
