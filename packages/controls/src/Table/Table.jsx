import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const attrs = ['dark', 'hover', 'striped', 'bordered'];
const Table = ({
  children,
  className,
  dark,
  hover,
  striped,
  bordered,
  small,
  xsResponsive,
  smResponsive,
  mdResponsive,
  lgResponsive,
  xlResponsive,
  ...props
}) => {
  const classes = classNames(
    'table',
    {
      'table-dark': dark,
      'table-hover': hover,
      'table-striped': striped,
      'table-bordered': bordered,
      'table-sm': small,
      'table-responsive': xsResponsive,
      'table-responsive-sm': smResponsive,
      'table-responsive-md': mdResponsive,
      'table-responsive-lg': lgResponsive,
      'table-responsive-xl': xlResponsive,
    },
    className,
  );

  return (
    <table className={classes} {...props}>
      {children}
    </table>
  );
};

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dark: PropTypes.bool,
  hover: PropTypes.bool,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  small: PropTypes.bool,
  xsResponsive: PropTypes.bool,
  smResponsive: PropTypes.bool,
  mdResponsive: PropTypes.bool,
  lgResponsive: PropTypes.bool,
  xlResponsive: PropTypes.bool,
};

export default Table;
