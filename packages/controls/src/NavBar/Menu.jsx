import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

let counter = 0;

class Menu extends Component {
  state = { open: false };
  toggleDropdown = ev => {
    ev.preventDefault();
    if (this.props.disabled) return;
    this.setState({ open: !this.state.open });
  };
  render() {
    const { children, label, disabled, className } = this.props;
    return (
      <li className={classNames('nav-item  dropdown', className)}>
        <a
          className={classNames('nav-link dropdown-toggle', { disabled })}
          style={{ cursor: disabled ? 'default' : 'pointer' }}
          aria-disabled={disabled}
          onClick={this.toggleDropdown}
          id={`navbarDropdownMenuLink${counter}`}
        >
          {label}
        </a>
        <div
          className={classNames('dropdown-menu', { show: this.state.open })}
          aria-labelledby={`navbarDropdownMenuLink${counter++}`}
          onClick={this.toggleDropdown}
        >
          {children}
        </div>
      </li>
    );
  }
}
Menu.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Menu;
