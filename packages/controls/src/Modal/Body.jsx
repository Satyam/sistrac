import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Body = ({ children, className, ...props }) => (
  <div className={classNames('modal-body', className)} {...props}>
    {children}
  </div>
);

Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Body;
