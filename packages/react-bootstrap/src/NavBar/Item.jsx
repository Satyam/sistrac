import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import classNames from 'classnames';

const Item = ({ children, href, disabled }) =>
  disabled ? (
    <li className="nav-item">
      <a className="nav-link disabled">{children}</a>
    </li>
  ) : (
    <Route path={href}>
      {({ match }) => (
        <li className={classNames('nav-item', { active: match })}>
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
