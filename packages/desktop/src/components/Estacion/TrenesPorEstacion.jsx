import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '@devasatyam/controls/lib/Table';
import SortDesc from 'react-icons/lib/fa/sort-alpha-desc';
import SortAsc from 'react-icons/lib/fa/sort-alpha-asc';
import isPlainClick from '_components/utils/isPlainClick';

import './styles.css';

export default class TrenesPorEstacion extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sortField: props.sortField || 'fecha',
      sortAsc: props.sortAsc || true,
    };
  }
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
  getTrenesSorted = () => {
    const { sortField, sortAsc } = this.state;
    const { trenes } = this.props;
    if (!trenes) return [];
    return trenes.concat().sort((a, b) => {
      let r = 0;
      if (a[sortField] < b[sortField]) r = -1;
      else if (a[sortField] > b[sortField]) r = 1;
      return sortAsc ? r : -r;
    });
  };
  render() {
    const { sortField, sortAsc } = this.state;
    const trenes = this.getTrenesSorted();
    const th = (name, label) => (
      <th onClick={this.changeSort} name={name}>
        <span>
          {sortField === name && (sortAsc ? <SortAsc /> : <SortDesc />)}
        </span>
        {label}
      </th>
    );

    return (
      <Table striped bordered condensed hover>
        <thead style={{ cursor: 'default' }}>
          <tr>
            {th('itinerario', 'Itinerario')}
            {th('llega', 'Llega')}
            {th('sale', 'Sale')}
            {th('fecha', 'Fecha')}
            {th('chapa', 'Chapa')}
            {th('numero', 'Número')}
          </tr>
        </thead>
        <tbody>
          {trenes.map(tren => (
            <tr key={tren.idTren}>
              <td>
                <Link to={`/itinerarios/${tren.idItinerario}`}>
                  {tren.nombre}
                </Link>
              </td>
              <td>{tren.llega}</td>
              <td>{tren.sale}</td>
              <td>{tren.fecha.toLocaleString()}</td>
              <td>
                <Link to={`/trenes/${tren.idTren}`}>{tren.chapa}</Link>
              </td>
              <td>
                <Link to={`/trenes/${tren.idTren}`}>{tren.numero}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
