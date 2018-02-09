import React from 'react';
import PropTypes from 'prop-types';

const TableCol = () => null;

TableCol.propTypes = {
  name: PropTypes.string.isRequired,
  sortable: PropTypes.bool,
  sortCompare: PropTypes.func,
  label: PropTypes.node.isRequired,
  format: PropTypes.func,
};

export default TableCol;
