import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

const Button = ({ children, href, disabled, external, onClick, className }) => {
  if (disabled) {
    return (
      <li className={classNames('nav-item', className)}>
        <a className="nav-link disabled" aria-disabled>
          {children}
        </a>
      </li>
    );
  }
  if (external || onClick) {
    return (
      <li className={classNames('nav-item', className)}>
        <a className="nav-link" href={href} onClick={onClick}>
          {children}
        </a>
      </li>
    );
  }
  return (
    <Route path={href}>
      {({ match }) => (
        <li className={classNames('nav-item', className, { active: match })}>
          <Link className="nav-link" to={href}>
            {children}
          </Link>
        </li>
      )}
    </Route>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
