import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class Button extends Component {
  constructor(props) {
    super(props);
    const { active, toggle, color } = props;
    if ((active || toggle) && !color)
      throw new Error('Button: active/toggle state invisible without color');
    this.state = { active };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.state.active)
      this.setState({ active: nextProps.active });
  }
  onClick = ev => {
    const { toggle, onClick } = this.props;
    if (toggle) this.setState({ active: !this.state.active });
    if (onClick) onClick(ev);
  };
  render() {
    const {
      color,
      outline,
      className,
      children,
      size,
      href,
      disabled,
      /* the following are listed so as to be discarded from ..props below */
      active,
      toggle,
      onClick,
      ...props
    } = this.props;

    const mergedProps = {
      ...props,
      disabled,
      className: classNames(
        'btn',
        color && (outline ? `btn-outline-${color}` : `btn-${color}`),
        size && `btn-${size}`,
        { active: this.state.active },
        className,
      ),
      onClick: this.onClick,
    };
    if (toggle) mergedProps['aria-pressed'] = this.state.active;
    if (disabled) mergedProps['aria-disabled'] = true;
    return href && !disabled ? (
      <Link to={href} role="button" {...mergedProps}>
        {children}
      </Link>
    ) : (
      <button {...mergedProps}>{children}</button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'link',
  ]),
  size: PropTypes.oneOf(['sm', 'lg', 'block']),
  outline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  href: PropTypes.string,
  active: PropTypes.bool,
  toggle: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
