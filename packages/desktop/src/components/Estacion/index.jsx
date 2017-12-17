import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import initStore from '../utils/initStore';

import { getEstacion } from '../../store/actions';
import { selEstacion } from '../../store/selectors';

import './styles.css';

export class Estacion extends Component {
  render() {
    const { estacion } = this.props;
    if (!estacion) return null;
    const { sigla, nombre, latitud, longitud } = estacion;
    const position = [latitud, longitud];
    return (
      <Grid>
        <Helmet>
          <title>
            Sistrac - {sigla} - {nombre}
          </title>
        </Helmet>,
        <Row>
          <Col mdOffset={2} md={8}>
            <PageHeader>
              {sigla} <small>{nombre}</small>
            </PageHeader>
            <div height="400px">
              <Map center={position} zoom={13}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={position}>
                  <Popup>
                    <span>
                      A pretty CSS3 popup.<br />Easily customizable.
                    </span>
                  </Popup>
                </Marker>
              </Map>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

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
