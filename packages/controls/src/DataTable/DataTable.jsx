import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Table from '../Table';
import TableCol from './TableCol';
import SortDesc from 'react-icons/lib/fa/sort-desc';
import SortAsc from 'react-icons/lib/fa/sort-asc';
import Sort from 'react-icons/lib/fa/sort';
import classNames from 'classnames';

import isPlainClick from '../utils/isPlainClick';

import './styles.css';

const defaultSort = (sortField, a, b) => {
  if (a[sortField] < b[sortField]) return -1;
  if (a[sortField] > b[sortField]) return 1;
  return 0;
};

class DataTable extends Component {
  constructor(props) {
    super(props);
    const { sortField, sortAsc } = props;
    this.state = {
      sortField,
      sortAsc: sortAsc || true,
    };
    this.hash = {};
    this.readCols(props.children);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (nextProps.children !== this.props.children) {
        console.log('DataTable new children');
        this.readCols(nextProps.children);
      }
    }
  }
  readCols = children => {
    this.colNames = Children.map(children, Child => {
      if (Child.type !== TableCol) {
        throw new Error('DataTable only accepts children of type TableCol');
      }
      const { name, ...props } = Child.props;
      //      props.sortCompare = props.sortCompare || defaultCompare;
      this.hash[name] = props;
      return name;
    });
  };
  changeSort = ev => {
    if (!isPlainClick(ev)) return;
    const { sortField, sortAsc } = this.state;
    const name = ev.target.getAttribute('name');
    if (name === sortField) {
      this.setState({ sortAsc: !sortAsc });
    } else {
      this.setState({ sortField: name });
    }
  };
  getSortedData = () => {
    const { sortField, sortAsc } = this.state;
    const { data, sortFunc } = this.props;

    if (!data) return [];
    if (!sortField) return data;
    const fn = (sortFunc || defaultSort).bind(this, sortField);
    const fn1 = sortAsc ? fn : (a, b) => fn(a, b) * -1;

    return data.concat().sort(fn1);
  };
  renderHead = () => {
    const { sortField, sortAsc } = this.state;
    return this.colNames.map(name => {
      const { label, sortable } = this.hash[name];
      return (
        <th
          onClick={sortable ? this.changeSort : void 0}
          className={classNames({ sortable, sorted: sortField === name })}
          name={name}
          key={name}
        >
          <span>
            {sortable &&
              (sortField === name ? (
                sortAsc ? (
                  <SortAsc />
                ) : (
                  <SortDesc />
                )
              ) : (
                <Sort />
              ))}
          </span>
          {label}
        </th>
      );
    });
  };
  renderBody = () => {
    const { colNames } = this;
    const data = this.getSortedData();
    return data.map(row => {
      const key = String(row[this.props.keyName]);
      return (
        <tr key={key}>
          {colNames.map(name => {
            const { format, className } = this.hash[name];
            return (
              <td className={className} key={`${key}-${name}`}>
                {format ? format(row[name], row) : row[name]}
              </td>
            );
          })}
        </tr>
      );
    });
  };
  render() {
    return (
      <Table {...this.props}>
        <thead>
          <tr>{this.renderHead()}</tr>
        </thead>
        <tbody>{this.renderBody()}</tbody>
      </Table>
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  keyName: PropTypes.string,
  sortField: PropTypes.string,
  sortAsc: PropTypes.bool,
  children: PropTypes.node,
  sortFunc: PropTypes.func,
};

export default DataTable;
