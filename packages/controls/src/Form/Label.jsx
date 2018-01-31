import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ children, ...props }) => <label {...props}>{children}</label>;

Label.propTypes = {
  children: PropTypes.node,
};

export default Label;
