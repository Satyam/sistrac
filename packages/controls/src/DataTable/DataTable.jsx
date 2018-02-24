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

class DataTable extends Component {
  constructor(props) {
    super(props);
    const { sortCol, sortDesc } = props;
    this.state = {
      sortCol,
      sortDesc,
    };
    this.hash = {};
    this.readCols(props.children);
  }
  componentWillReceiveProps(nextProps) {
    this.readCols(nextProps.children);
  }
  static defaultCompare(sortCol, a, b) {
    if (a[sortCol] < b[sortCol]) return -1;
    if (a[sortCol] > b[sortCol]) return 1;
    return 0;
  }
  readCols = children => {
    this.colNames = Children.map(children, Child => {
      if (Child.type === 'caption') {
        this.caption = Child;
        return;
      }
      if (Child.type === TableCol) {
        const { name, ...props } = Child.props;
        this.hash[name] = props;
        return name;
      }
      throw new Error(
        'DataTable only accepts children of type DataTable.Col or caption',
      );
    });
  };
  changeSort = ev => {
    if (!isPlainClick(ev)) return;
    const { sortCol, sortDesc } = this.state;
    const name = ev.target.getAttribute('name');
    if (name === sortCol) {
      this.setState({ sortDesc: !sortDesc });
    } else {
      this.setState({ sortCol: name });
    }
  };
  getSortedData = () => {
    const { sortCol, sortDesc } = this.state;
    const { data, sortCompare } = this.props;

    if (!data) return [];
    if (!sortCol) return data;
    const fn = (sortCompare || DataTable.defaultCompare).bind(this, sortCol);
    const fn1 = sortDesc ? (a, b) => fn(a, b) * -1 : fn;

    return data.concat().sort(fn1);
  };
  renderHead = () => {
    const { sortCol, sortDesc } = this.state;
    return this.colNames.map(name => {
      const { label, sortable, headClassName } = this.hash[name];
      return (
        <th
          onClick={sortable ? this.changeSort : void 0}
          className={classNames(
            { sortable, sorted: sortCol === name },
            headClassName,
          )}
          name={name}
          key={name}
        >
          <span>
            {sortable &&
              (sortCol === name ? (
                sortDesc ? (
                  <SortDesc />
                ) : (
                  <SortAsc />
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
    const { onRowClick, keyName } = this.props;
    return this.getSortedData().map(row => {
      const key = row[keyName];
      const props = {
        key,
        onClick: onRowClick ? ev => onRowClick(key, ev) : undefined,
      };
      /* eslint-disable react/jsx-key */
      return (
        <tr {...props}>
          {colNames.map(name => {
            const { format, className, style, onCellClick } = this.hash[name];
            const props = {
              key: `${key}-${name}`,
              className,
              style,
              onClick:
                onCellClick &&
                (ev => onCellClick(name, row[keyName], row[name], row, ev)),
            };
            return (
              <td {...props}>{format ? format(row[name], row) : row[name]}</td>
            );
            /* eslint-enable react/jsx-key */
          })}
        </tr>
      );
    });
  };
  render() {
    const {
      // Just to discard the rest
      data,
      sortCol,
      sortDesc,
      keyName,
      sortCompare,
      onRowClick,
      children,
      ...props
    } = this.props;
    return (
      <Table {...props}>
        {this.caption}
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
  sortCol: PropTypes.string,
  sortDesc: PropTypes.bool,
  children: PropTypes.node,
  sortCompare: PropTypes.func,
  onRowClick: PropTypes.func,
};

export default DataTable;
