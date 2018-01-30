import React from 'react';
import { Row, Col } from '@devasatyam/controls/lib/Grid';
import formatCoords from 'formatcoords';

export default function SumarioEstacion({ estacion }) {
  if (!estacion) return null;
  const { idEstacion, nombre, latitud, longitud } = estacion;
  const latLng = formatCoords([latitud, longitud])
    .format('DD MM ss X', { latLonSeparator: '|', decimalPlaces: 0 })
    .split('|');
  return [
    <Row key="sigla">
      <Col xs={4}>
        <label>Sigla</label>
      </Col>
      <Col xs={8}>{idEstacion}</Col>
    </Row>,
    <Row key="nombre">
      <Col xs={4}>
        <label>Nombre</label>
      </Col>
      <Col xs={8}>{nombre}</Col>
    </Row>,
    <Row key="latitud">
      <Col xs={4}>
        <label>Latitud</label>
      </Col>
      <Col xs={4}>{latitud}</Col>
      <Col xs={4}>{latLng[0]}</Col>
    </Row>,
    <Row key="longitud">
      <Col xs={4}>
        <label>Longitud</label>
      </Col>
      <Col xs={4}>{longitud}</Col>
      <Col xs={4}>{latLng[1]}</Col>
    </Row>,
  ];
}
