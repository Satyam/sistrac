import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active };
  }
  onClick = ev => {
    const { onToggle } = this.props;
    const { name } = ev.target;
    if (this.state.active === name) return;
    if (onToggle) onToggle(name, ev);
    this.setState({ active: name });
  };
  render() {
    const { className, children, toggle, onToggle, ...props } = this.props;
    return (
      <div role="group" className={classNames('btn-group', className)}>
        {toggle
          ? Children.map(children, child =>
              cloneElement(child, {
                ...props,
                onClick: this.onClick,
                active: this.state.active === child.props.name,
              }),
            )
          : children}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  toggle: PropTypes.bool,
  onToggle: PropTypes.func,
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
  active: PropTypes.bool,
};

export default ButtonGroup;
