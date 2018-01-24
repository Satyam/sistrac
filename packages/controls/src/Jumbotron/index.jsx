import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Jumbotron = ({ children, className }) => (
  <div className={classNames('jumbotron', className)}>{children}</div>
);

Jumbotron.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Jumbotron;
export { Jumbotron };
