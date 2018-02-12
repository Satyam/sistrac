import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Col from './Col';

const Row = ({ children, className, vAlign = {}, justify = {}, ...props }) => (
  <div
    className={classNames('row', className, {
      'align-items-start': vAlign === 'top',
      'align-items-center': vAlign === 'middle',
      'align-items-end': vAlign === 'bottom',
      'justify-content-start': justify === 'left',
      'justify-content-center': justify === 'center',
      'justify-content-end': justify === 'right',
      'justify-content-around': justify === 'even',
      'justify-content-between': justify === 'edges',
    })}
    {...props}
  >
    {Children.map(children, child => {
      if (child instanceof Col)
        throw new Error('A Row can only contain elements of type Col');
      return child;
    })}
  </div>
);

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  justify: PropTypes.oneOf(['left', 'center', 'right', 'even', 'edges']),
};

export default Row;
