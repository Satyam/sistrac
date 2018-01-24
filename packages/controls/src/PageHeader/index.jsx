import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageHeader = ({ children, className }) => (
  <div className={classNames('jumbotron', className)}>
    <h1>{children}</h1>
  </div>
);

PageHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PageHeader;
export { PageHeader };
