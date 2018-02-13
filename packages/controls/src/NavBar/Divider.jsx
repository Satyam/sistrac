import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Divider = ({ className, ...props }) => (
  <div className={classNames('dropdown-divider', className)} {...props} />
);

Divider.propTypes = {
  className: PropTypes.string,
};

export default Divider;
