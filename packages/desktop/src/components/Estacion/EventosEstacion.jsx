import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '@devasatyam/controls/lib/Table';
import SortDesc from 'react-icons/lib/fa/sort-alpha-desc';
import SortAsc from 'react-icons/lib/fa/sort-alpha-asc';
import isPlainClick from '_components/utils/isPlainClick';

import './styles.css';

export default class EventosPorEstacion extends Component {
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
  getEventosSorted = () => {
    const { sortField, sortAsc } = this.state;
    const { eventos } = this.props;
    if (!eventos) return [];
    return eventos.concat().sort((a, b) => {
      let r = 0;
      if (a[sortField] < b[sortField]) r = -1;
      else if (a[sortField] > b[sortField]) r = 1;
      return sortAsc ? r : -r;
    });
  };
  getUsuarios() {
    const { eventos, getUsuarios } = this.props;
    if (!eventos.length) return;
    const idUsuarios = eventos.map(evento => evento.idUsuario);
    getUsuarios(idUsuarios);
  }
  componentDidMount = () => {
    this.getUsuarios();
  };
  componentDidUpdate = () => {
    this.getUsuarios();
  };
  render() {
    const { sortField, sortAsc } = this.state;
    const eventos = this.getEventosSorted();
    if (!eventos.length) return null;
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
            {th('fecha', 'Fecha')}
            {th('descrEvento', 'Evento')}
            {th('nombreUsuario', 'Usuario')}
            {th('numeroTren', 'Tren')}
            {th('observaciones', 'Observaciones')}
            {th('velocidad', 'Velocidad')}
            {th('descrEmergencia', 'Emergencia')}
          </tr>
        </thead>
        <tbody>
          {eventos.map(evento => (
            <tr key={evento.idEvento}>
              <td>{evento.fecha.toLocaleString()}</td>
              <td>
                <Link to={`/eventos/${evento.idEvento}`}>
                  {evento.descrEvento}
                </Link>
              </td>
              <td>
                <Link to={`/usuarios/${evento.idUsuario}`}>
                  {evento.usuario}
                </Link>
              </td>
              <td>
                <Link to={`/trenes/${evento.idTren}`}>{evento.numeroTren}</Link>
              </td>
              <td>{evento.observaciones}</td>
              <td>{evento.velocidad}</td>
              <td>{evento.descrEmergencia}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
