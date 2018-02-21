import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Footer = ({ children, className, ...props }) => (
  <div className={classNames('modal-footer bg-light', className)} {...props}>
    {children}
  </div>
);

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Footer;
