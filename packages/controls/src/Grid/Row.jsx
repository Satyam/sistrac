import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Col from './Col';

const Row = ({ children, className }) => (
  <div className={classNames('row', className)}>
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
};

export default Row;
