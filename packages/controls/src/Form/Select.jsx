import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Select = ({ options, meta, input, ...props }) => (
  <select className="form-control" {...props} {...input}>
    {options}
  </select>
);

Select.propTypes = {
  options: PropTypes.node,
  meta: PropTypes.object,
  input: PropTypes.object,
};

export default Select;
