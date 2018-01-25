import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Help = ({ className, children }) => (
  <small className={classNames('form-text text-muted', className)}>
    {children}
  </small>
);

Help.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Help;
