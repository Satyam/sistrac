import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const rex = /(lg|md|sm|xs|xl)(Offset|Order|HideAbove|HideBelow)?/;
const Col = ({ className, children, ...props }) => {
  const classes = [];
  let hasHide;
  Object.keys(props).forEach(prop => {
    const match = rex.exec(prop);
    if (match) {
      const [input, size, action] = match;
      const dashSize = size === 'xs' ? '' : `-${size}`;
      switch (action) {
        case 'Offset':
          classes.push(`offset${dashSize}-${props[prop]}`);
          break;
        case 'Order':
          classes.push(`order${dashSize}-${props[prop]}`);
          break;
        case 'HideAbove':
          if (hasHide)
            throw new Error(
              `Can only have one xxHide className per Col, found ${hasHide} and ${input}`,
            );
          hasHide = input;
          classes.push(`d${dashSize}-none`);
          break;
        case 'HideBelow':
          if (hasHide)
            throw new Error(
              `Can only have one xxHide className per Col, found ${hasHide} and ${input}`,
            );
          hasHide = input;
          classes.push(`d-none d${dashSize}-block`);
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
