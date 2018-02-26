import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DataTable from '@devasatyam/controls/lib/DataTable';

const formatFecha = value => value.toLocaleString();
const formatDescrEvento = (value, evento) => (
  <Link to={`/eventos/${evento.idEvento}`}>{value}</Link>
);
const formatUsuario = (value, evento) => (
  <Link to={`/usuarios/${evento.idUsuario}`}>{value}</Link>
);
const formatTren = (value, evento) => (
  <Link to={`/trenes/${evento.idTren}`}>{value}</Link>
);
const EventosPorEstacion = ({ sortCol, sortDesc, eventos }) => (
  <DataTable
    striped
    bordered
    compact
    hover
    keyName="idEvento"
    data={eventos}
    sortCol={sortCol || 'fecha'}
    sortDesc={sortDesc}
  >
    <DataTable.Col name="fecha" label="Fecha" sortable format={formatFecha} />
    <DataTable.Col
      name="descrEvento"
      label="Evento"
      sortable
      format={formatDescrEvento}
    />
    <DataTable.Col
      name="usuario"
      label="Usuario"
      sortable
      format={formatUsuario}
    />
    <DataTable.Col
      name="numeroTren"
      label="Tren"
      sortable
      format={formatTren}
    />
    <DataTable.Col name="observaciones" label="Observaciones" sortable />
    <DataTable.Col name="velocidad" label="Velocidad" sortable />
    <DataTable.Col name="descrEmergencia" label="Emergencia" sortable />
  </DataTable>
);

EventosPorEstacion.propTypes = {
  sortCol: PropTypes.string,
  sortDesc: PropTypes.bool,
  eventos: PropTypes.arrayOf(PropTypes.object),
};

export default EventosPorEstacion;
