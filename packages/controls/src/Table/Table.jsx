import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Table = ({ children, className, ...props }) => {
  const classes = classNames(
    'table',
    Object.keys(props).map(prop => {
      switch (prop) {
        case 'small':
          return 'table-sm';
        case 'smResponsive':
          return 'table-responsive-sm';
        case 'mdResponsive':
          return 'table-responsive-md';
        case 'lgResponsive':
          return 'table-responsive-lg';
        case 'xlResponsive':
          return 'table-responsive-xl';
        default:
          return `table-${prop}`;
      }
    }),
    className,
  );

  return <table className={classes}>{children}</table>;
};

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Table;
