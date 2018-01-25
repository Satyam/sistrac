import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ children, ...props }) => (
  <div>
    <input type="checkbox" {...props} />
    {children}
  </div>
);

Checkbox.propTypes = {
  children: PropTypes.node,
};

export default Checkbox;
