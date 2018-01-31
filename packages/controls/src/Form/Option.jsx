import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ children, ...props }) => (
  <option {...props}>{children}</option>
);

Option.propTypes = {
  children: PropTypes.node,
};

export default Option;
