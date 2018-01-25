import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ className, children, htmlFor }) => (
  <label className={className} htmlFor={htmlFor}>
    {children}
  </label>
);

Label.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

export default Label;
