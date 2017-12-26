import React from 'react';
import { PageHeader, Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import TrenesPorEstacion from './TrenesPorEstacion';
import Sumario from './Sumario';
import initStore from '../utils/initStore';

import { getEstacion } from '../../store/actions';
import { selEstacion } from '../../store/selectors';

import { withRouterTypes, estacionShape } from '../../shapes';

import './styles.css';

export function Estacion({ estacion, match, history }) {
  if (!estacion) return null;
  const tabClick = activeTab => {
    history.push(`/estacion/${match.params.idEstacion}/${activeTab}`);
  };
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
          <Tabs
            activeKey={match.params.activeTab || 'basic'}
            onSelect={tabClick}
            id="trenes-por-estacion"
            mountOnEnter={true}
          >
            <Tab eventKey="basic" title="Sumario">
              <Sumario estacion={estacion} />
            </Tab>
            <Tab eventKey="trenes" title="Trenes">
              <TrenesPorEstacion idEstacion={idEstacion} />
            </Tab>
            <Tab eventKey={3} title="Tab 3" disabled>
              Tab 3 content
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Grid>
  );
}

Estacion.propTypes = {
  ...withRouterTypes,
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

export default compose(
  withRouter,
  initStore(storeInitializer),
  connect(mapStateToProps),
)(Estacion);
