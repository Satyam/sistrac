import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const DropdownItem = ({ children, href, disabled, className, external }) =>
  disabled ? (
    <a
      className={classNames('dropdown-item disabled', className)}
      style={{ opacity: 0.3 }}
    >
      {children}
    </a>
  ) : external ? (
    <a className={classNames('dropdown-item', className)} href={href}>
      {children}
    </a>
  ) : (
    <Link className={classNames('dropdown-item', className)} to={href}>
      {children}
    </Link>
  );

DropdownItem.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  className: PropTypes.string,
};

export default DropdownItem;
