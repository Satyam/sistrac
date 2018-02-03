import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Checkbox = ({ placeholder, ...props }) => (
  <div className="form-check">
    <input {...props} className="form-check-input" type="checkbox" />
    {placeholder && <span className="form-check-label">{placeholder}</span>}
  </div>
);

Checkbox.propTypes = {
  placeholder: PropTypes.node,
};

export default Checkbox;
