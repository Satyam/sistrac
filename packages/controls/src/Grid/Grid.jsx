import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Row from './Row';

const Grid = ({ children, className }) => (
  <div className={classNames('container', className)}>
    {Children.map(children, child => {
      if (child instanceof Row)
        throw new Error('A Grid can only contain elements of type Row');
      return child;
    })}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Grid;
