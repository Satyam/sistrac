import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DataTable from '@devasatyam/controls/lib/DataTable';
import { Row, Col } from '@devasatyam/controls/lib/Grid';
import { Button } from '@devasatyam/controls/lib/Button';
import Plus from 'react-icons/lib/go/plus';
import Trashcan from 'react-icons/lib/go/trashcan';
import Pencil from 'react-icons/lib/go/pencil';
import { Helmet } from 'react-helmet';
import { estacionShape } from '_src/shapes';

import './styles.css';

const formatEstacion = (value, estacion) => (
  <Link to={`/estacion/${estacion.idEstacion}`}>{value}</Link>
);
const delIcon = (value, estacion) => (
  <Button size="sm" color="danger" outline>
    <Trashcan />
  </Button>
);
const editIcon = (value, estacion) => (
  <Button
    size="sm"
    color="secondary"
    outline
    href={`/editEstacion/${estacion.idEstacion}`}
  >
    <Pencil />
  </Button>
);
const Estaciones = ({
  sortCol,
  sortDesc,
  estaciones,
  history,
  deleteEstacion,
}) => {
  const addEstacion = () => {
    history.push('/editEstacion');
  };
  const handleCellClick = (name, idEstacion) => {
    if (window.confirm(`Seguro que quiere borrar la estación ${idEstacion}`)) {
      deleteEstacion(idEstacion);
    }
  };
  return (
    <Fragment>
      <Helmet>
        <title>Sistrac - estaciones</title>
      </Helmet>
      <Row>
        <Col mdOffset={2} md={8} xs={12}>
          <Button className="addButton" onClick={addEstacion}>
            <Plus /> Add
          </Button>
          <DataTable
            striped
            bordered
            compact
            hover
            keyName="idEstacion"
            data={estaciones}
            sortCol={sortCol || 'nombre'}
            sortDesc={sortDesc}
          >
            <DataTable.Col
              name="idEstacion"
              label="Sigla"
              sortable
              format={formatEstacion}
            />
            <DataTable.Col name="nombre" label="Nombre" sortable />
            <DataTable.Col
              name="edit"
              label=""
              format={editIcon}
              style={{ textAlign: 'center' }}
            />
            <DataTable.Col
              name="delete"
              label=""
              format={delIcon}
              onCellClick={handleCellClick}
              style={{ textAlign: 'center' }}
            />
          </DataTable>
        </Col>
      </Row>
    </Fragment>
  );
};

Estaciones.propTypes = {
  estaciones: PropTypes.arrayOf(estacionShape),
};

export default Estaciones;
