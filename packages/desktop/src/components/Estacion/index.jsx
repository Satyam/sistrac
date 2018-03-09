import React from 'react';
import {
  Tabs,
  Row,
  Col,
  Jumbotron,
} from '@devasatyam/react-bootstrap-4-controls';
import { Helmet } from 'react-helmet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import TrenesPorEstacion from '_connectors/Estacion/TrenesPorEstacion';
import EventosEstacion from '_connectors/Estacion/EventosEstacion';
import Sumario from './Sumario';

import { withRouterTypes, estacionShape } from '_src/shapes';

import './styles.css';

export default function Estacion({ estacion, match, history }) {
  if (!estacion) return null;
  const { idEstacion, nombre, latitud, longitud } = estacion;
  const position = [latitud, longitud];
  return (
    (
      <Helmet>
        <title>
          Sistrac - {idEstacion} - {nombre}
        </title>
      </Helmet>
    ),
    (
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
          <Tabs tabGroup="estacionTab">
            <Tabs.Tab tabId="basic" label="Sumario" active>
              <Sumario estacion={estacion} />
            </Tabs.Tab>
            <Tabs.Tab tabId="trenes" label="Trenes">
              <TrenesPorEstacion idEstacion={idEstacion} />
            </Tabs.Tab>
            <Tabs.Tab tabId="eventos" label="Eventos">
              <EventosEstacion idEstacion={idEstacion} />
            </Tabs.Tab>
          </Tabs>
        </Col>
      </Row>
    )
  );
}

Estacion.propTypes = {
  ...withRouterTypes,
  estacion: estacionShape,
};
