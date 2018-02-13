import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Group = ({ children, right }) => (
  <ul
    className={classNames('navbar-nav', {
      'd-flex justify-content-end ml-auto': right,
    })}
  >
    {children}
  </ul>
);

Group.propTypes = {
  children: PropTypes.node,
  right: PropTypes.bool,
};

export default Group;
