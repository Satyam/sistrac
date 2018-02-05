import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tab = ({ tabId, disabled, label, className, onTabClick, active }) => (
  <li key={tabId} className={classNames('nav-item', className)}>
    <a
      onClick={ev => {
        ev.preventDefault();
        if (!disabled) onTabClick(tabId);
      }}
      className={classNames('nav-link', {
        active,
        disabled,
      })}
      href="#"
    >
      {label}
    </a>
  </li>
);

Tab.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.node,
  tabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func,
  className: PropTypes.string,
};

export default Tab;
