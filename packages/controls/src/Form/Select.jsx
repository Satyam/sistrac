import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form/es/propTypes';
import './styles.css';

const Select = ({ options, rxfProps, ...props }) => (
  <select className="form-control" {...props} {...rxfProps}>
    {options}
  </select>
);

Select.propTypes = {
  options: PropTypes.node,
  rxfProps: PropTypes.shape(fieldInputPropTypes),
};

export default Select;
