import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Grid, Row, Col } from '@devasatyam/controls/lib/Grid';
import Jumbotron from '@devasatyam/controls/lib/Jumbotron';
import { Helmet } from 'react-helmet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import TrenesPorEstacion from '_connectors/Estacion/TrenesPorEstacion';
import EventosEstacion from '_connectors/Estacion/EventosEstacion';
import Sumario from './Sumario';

import { withRouterTypes, estacionShape } from '_src/shapes';

import './styles.css';

export default function Estacion({ estacion, match, history }) {
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
          <Jumbotron>
            <h1>
              {idEstacion} <small>{nombre}</small>
            </h1>
          </Jumbotron>
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
            <Tab eventKey="eventos" title="Eventos">
              <EventosEstacion idEstacion={idEstacion} />
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
