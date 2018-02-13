import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import DataTable from '@devasatyam/controls/lib/DataTable';

const formatItinerario = (value, tren) => (
  <Link to={`/itinerarios/${tren.idItinerario}`}>{value}</Link>
);
const formatFecha = value => value.toLocaleString();
const formatLinkToTren = (value, tren) => (
  <Link to={`/trenes/${tren.idTren}`}>{value}</Link>
);
const TrenesPorEstacion = ({ sortCol, sortDesc, trenes }) => (
  <DataTable
    striped
    bordered
    compact
    hover
    keyName="idTren"
    data={trenes}
    sortCol={sortCol || 'fecha'}
    sortDesc={sortDesc}
  >
    <DataTable.Col
      name="nombre"
      label="Itinerario"
      format={formatItinerario}
      sortable
    />
    <DataTable.Col name="llega" label="Llega" sortable />
    <DataTable.Col name="sale" label="Sale" sortable />
    <DataTable.Col name="fecha" label="Fecha" format={formatFecha} sortable />
    <DataTable.Col
      name="chapa"
      label="Chapa"
      format={formatLinkToTren}
      sortable
    />
    <DataTable.Col
      name="numero"
      label="Número"
      format={formatLinkToTren}
      sortable
    />
  </DataTable>
);

TrenesPorEstacion.propTypes = {
  sortCol: PropTypes.string,
  sortDesc: PropTypes.bool,
  trenes: PropTypes.arrayOf(PropTypes.object),
};
export default TrenesPorEstacion;
