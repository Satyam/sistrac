import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Jumbotron = ({ children, className, color, background, ...props }) => {
  const text = color && `text-${color}`;
  const bg = background && `bg-${background}`;
  return (
    <div className={classNames('jumbotron', text, bg, className)} {...props}>
      {children}
    </div>
  );
};

Jumbotron.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'warning',
    'danger',
    'light',
    'white',
    'dark',
  ]),
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
};

export default Jumbotron;
export { Jumbotron };
