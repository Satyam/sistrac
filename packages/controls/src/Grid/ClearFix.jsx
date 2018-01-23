import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ClearFix = ({ children, className }) => (
  <div className={classNames('clearfix', className)}>{children}</div>
);

ClearFix.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ClearFix;
