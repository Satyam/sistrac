import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Item = ({ children, href, disabled, className, external, onClick }) => {
  if (disabled) {
    return (
      <a
        className={classNames('dropdown-item disabled', className)}
        style={{ opacity: 0.3 }}
      >
        {children}
      </a>
    );
  }
  if (external) {
    return (
      <a
        className={classNames('dropdown-item', className)}
        href={href}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link className={classNames('dropdown-item', className)} to={href}>
      {children}
    </Link>
  );
};

Item.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Item;
