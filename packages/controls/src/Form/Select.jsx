import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Select = ({ options, ...props }) => (
  <select className="form-control" {...props}>
    {options}
  </select>
);

Select.propTypes = {
  options: PropTypes.node,
};

export default Select;
