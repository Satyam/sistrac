import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class NavBar extends Component {
  constructor(...args) {
    super(...args);
    this.state = { open: true };
    this.toggle = this.toggle.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }
  toggle(ev) {
    ev.preventDefault();
    this.setState({ open: !this.state.open });
  }
  dismiss(ev) {
    if (ev.target.href) this.setState({ open: false });
  }
  render() {
    const { children, brand, href } = this.props;
    const { open } = this.state;
    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-light bg-light">
        {href ? (
          <Link to={href} className="navbar-brand">
            {brand}
          </Link>
        ) : (
          <div className="navbar-brand">{brand}</div>
        )}
        <button
          className={classNames('navbar-toggler', { collapsed: open })}
          type="button"
          onClick={this.toggle}
          aria-expanded={!open}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={classNames('collapse', 'navbar-collapse', {
            show: open,
          })}
          onClick={this.dismiss}
        >
          {children}
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  children: PropTypes.node,
  brand: PropTypes.string,
  href: PropTypes.string,
};

export default NavBar;
