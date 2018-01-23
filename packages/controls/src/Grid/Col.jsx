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
      console.log(prop, props[prop], size, offset, match);
      if (size === 'xs') {
        switch (offset) {
          case 'Offset':
            classes.push(`offset-${props[prop]}`);
            break;
          case 'Order':
            classes.push(`offset-${props[prop]}`);
            break;
          case 'Hidden':
            classes.push(`d-none d-sm-block`);
            break;
          default:
            classes.push(`col-${props[prop]}`);
        }
      } else {
        switch (offset) {
          case 'Offset':
            classes.push(`offset-${size}-${props[prop]}`);
            break;
          case 'Order':
            classes.push(`order-${size}-${props[prop]}`);
            break;
          case 'Hidden':
            classes.push(`d-${size}-none d-${next[size]}-block`);
            break;
          default:
            classes.push(`col-${size}-${props[prop]}`);
        }
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
