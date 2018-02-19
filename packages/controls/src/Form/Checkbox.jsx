import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Checkbox = ({ placeholder, meta, input, ...props }) => (
  <div className="form-check">
    <input {...props} {...input} className="form-check-input" type="checkbox" />
    {placeholder && <span className="form-check-label">{placeholder}</span>}
  </div>
);

Checkbox.propTypes = {
  placeholder: PropTypes.node,
  meta: PropTypes.object,
  input: PropTypes.object,
};

export default Checkbox;
