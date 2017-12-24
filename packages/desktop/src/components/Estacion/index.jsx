import React from 'react';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import initStore from '../utils/initStore';

import { getEstacion } from '../../store/actions';
import { selEstacion } from '../../store/selectors';

import { estacionShape } from '../../shapes';

import './styles.css';

export function Estacion({ estacion }) {
  if (!estacion) return null;
  const { idEstacion, nombre, latitud, longitud } = estacion;
  const position = [latitud, longitud];
  return (
    <Grid>
      <Helmet>
        <title>
          Sistrac - {idEstacion} - {nombre}
        </title>
      </Helmet>,
      <Row>
        <Col xs={12} mdOffset={2} md={8}>
          <PageHeader>
            {idEstacion} <small>{nombre}</small>
          </PageHeader>
          <Map center={position} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={position}>
              <Popup>
                <span>
                  {idEstacion} - {nombre}
                </span>
              </Popup>
            </Marker>
          </Map>
        </Col>
      </Row>
    </Grid>
  );
}

Estacion.propTypes = {
  estacion: estacionShape,
};

export const storeInitializer = (dispatch, getState, { match }) => {
  const idEstacion = match && match.params.idEstacion;
  return (
    idEstacion &&
    (selEstacion(getState(), idEstacion) || dispatch(getEstacion(idEstacion)))
  );
};

export const mapStateToProps = (state, { match }) =>
  match
    ? {
        estacion: selEstacion(state, match.params.idEstacion),
      }
    : {};

export default compose(initStore(storeInitializer), connect(mapStateToProps))(
  Estacion,
);
