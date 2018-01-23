import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DropdownItem = ({ children, href, disabled }) =>
  disabled ? (
    <a className="dropdown-item disabled" style={{ opacity: 0.3 }}>
      {children}
    </a>
  ) : (
    <Link className="dropdown-item" to={href}>
      {children}
    </Link>
  );

DropdownItem.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DropdownItem;
