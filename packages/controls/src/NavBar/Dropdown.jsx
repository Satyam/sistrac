import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

let counter = 0;

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  toggleDropdown = ev => {
    ev.preventDefault();
    if (this.props.disabled) return;
    this.setState({ open: !this.state.open });
  };
  render() {
    const { children, label, icon, disabled } = this.props;
    return (
      <li className="nav-item  dropdown">
        <a
          className={classNames('nav-link dropdown-toggle', { disabled })}
          style={{ cursor: disabled ? 'default' : 'pointer' }}
          aria-disabled={disabled}
          onClick={this.toggleDropdown}
          id={`navbarDropdownMenuLink${counter}`}
        >
          {icon ? <span className="mr-1">{icon}</span> : null}
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
Dropdown.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
};

export default Dropdown;
