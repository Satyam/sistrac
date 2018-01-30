import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

const Item = ({ children, href, disabled, external, className }) =>
  disabled ? (
    <li className={classNames('nav-item', className)}>
      <a className="nav-link disabled">{children}</a>
    </li>
  ) : external || !href ? (
    <li className={classNames('nav-item', className)}>
      <a className="nav-link" href={href}>
        {children}
      </a>
    </li>
  ) : (
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

Item.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Item;
