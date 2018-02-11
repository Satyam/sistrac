import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DataTable from '@devasatyam/controls/lib/DataTable';
import { Row, Col } from '@devasatyam/controls/lib/Grid';
import { Button } from '@devasatyam/controls/lib/Button';
import Plus from 'react-icons/lib/go/plus';
import { Helmet } from 'react-helmet';
import { estacionShape } from '_src/shapes';

import './styles.css';

const formatEstacion = (value, estacion) => (
  <Link to={`/estacion/${estacion.idEstacion}`}>{value}</Link>
);

const Estaciones = ({ sortCol, sortDesc, estaciones, history }) => {
  const addEstacion = () => {
    history.push('/estacion/editEstacion');
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
            condensed
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
