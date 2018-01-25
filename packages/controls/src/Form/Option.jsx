import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ children, value, selected }) => (
  <option value={value} selected={selected}>
    {children}
  </option>
);

Option.propTypes = {
  value: PropTypes.string,
  children: PropTypes.node,
  selected: PropTypes.bool,
};

export default Option;
