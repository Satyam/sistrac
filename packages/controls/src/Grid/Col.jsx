import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const next = {
  xs: 'sm',
  sm: 'md',
  md: 'lg',
  lg: 'xl',
};
const rex = /(lg|md|sm|xs|xl)(Offset|Order|Hidden)?/;
const Col = ({ className, children, ...props }) => {
  const classes = [];

  Object.keys(props).forEach(prop => {
    const match = rex.exec(prop);
    if (match) {
      const [input, size, offset] = match;
      const dashSize = size === 'xs' ? '' : `-${size}`;
      switch (offset) {
        case 'Offset':
          classes.push(`offset${dashSize}-${props[prop]}`);
          break;
        case 'Order':
          classes.push(`order${dashSize}-${props[prop]}`);
          break;
        case 'Hidden':
          classes.push(`d${dashSize}-none d-${next[size]}-block`);
          break;
        default:
          classes.push(`col${dashSize}-${props[prop]}`);
      }
    }
  });

  return <div className={classNames(classes, className)}>{children}</div>;
};

Col.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Col;
