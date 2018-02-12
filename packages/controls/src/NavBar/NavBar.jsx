import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class NavBar extends Component {
  constructor(...args) {
    super(...args);
    this.state = { open: true };
  }
  toggle = ev => {
    ev.preventDefault();
    this.setState({ open: !this.state.open });
  };
  dismiss = ev => {
    if (ev.target.href) this.setState({ open: false });
  };
  render() {
    const {
      children,
      brand,
      href,
      position,
      dark,
      background,
      breakpoint,
      external,
      onClick,
    } = this.props;
    const { open } = this.state;
    return (
      <nav
        className={classNames(
          'navbar',
          {
            'fixed-top': position === 'top',
            'fixed-bottom': position === 'bottom',
            'sticky-top': position === 'sticky-top',
            'navbar-light': !dark,
            'navbar-dark': dark,
          },
          background && `bg-${background}`,
          breakpoint && `navbar-expand-${breakpoint}`,
        )}
      >
        {href ? (
          external ? (
            <a href={href} className="navbar-brand">
              {brand}
            </a>
          ) : (
            <Link to={href} className="navbar-brand">
              {brand}
            </Link>
          )
        ) : (
          <div className="navbar-brand" onClick={onClick}>
            {brand}
          </div>
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
  brand: PropTypes.node,
  href: PropTypes.string,
  external: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'bottom', 'sticky-top']),
  dark: PropTypes.bool,
  background: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'warning',
    'danger',
    'light',
    'white',
    'dark',
  ]),
  breakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  onClick: PropTypes.func,
};

export default NavBar;
