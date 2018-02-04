import React, { Component } from 'react';
import { Button } from '@devasatyam/controls/lib/Button';
import Form from '@devasatyam/controls/lib/Form';
import { Row, Col } from '@devasatyam/controls/lib/Grid';
import { Map, Marker, TileLayer } from 'react-leaflet';
import formatcoords from 'formatcoords';
import isPlainClick from '_components/utils/isPlainClick';

import { withRouterTypes, estacionShape } from '_src/shapes';

import './styles.css';

export default class EditEstacion extends Component {
  constructor(props, context) {
    super(props, context);
    const { match, estacion, duplicado } = this.props;
    const idEstacion = match.params.idEstacion;
    this.state = {
      add: !idEstacion,
      nombre: (estacion && estacion.nombre) || '',
      idEstacion: (estacion && estacion.idEstacion) || '',
      latitud: (estacion && estacion.latitud) || 0,
      longitud: (estacion && estacion.longitud) || 0,
      duplicado,
    };
    if (!idEstacion && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.setState({ latitud: coords.latitude, longitud: coords.longitude });
      });
    }
  }

  idEstacionChange = ev => {
    this.setState({
      idEstacion: ev.target.value.toUpperCase(),
      duplicado: false,
    });
  };
  validateIdEstacion = () => {
    const { idEstacion, duplicado } = this.state;
    if (duplicado) return 'error';
    if (idEstacion.length !== 3) {
      return 'warning';
    }
    return 'success';
  };
  nombreChange = ev => {
    this.setState({ nombre: ev.target.value });
  };
  validateNombre = () => {
    const { nombre } = this.state;
    if (nombre.length < 3) {
      return 'warning';
    }
    return 'success';
  };
  latitudChange = ev => {
    this.setState({ latitud: ev.target.value.replace(',', '.') });
  };
  validateLatitud = () => {
    const { latitud } = this.state;
    if (latitud < -90 || latitud > 90) return 'warning';
    return 'success';
  };
  longitudChange = ev => {
    this.setState({ longitud: ev.target.value.replace(',', '.') });
  };
  validateLongitud = () => {
    const { longitud } = this.state;
    if (longitud < -180 || longitud > 180) return 'warning';
    return 'success';
  };
  mapClick = ev => {
    const { latlng: { lat, lng } } = ev;
    this.setState({
      latitud: lat,
      longitud: lng,
    });
  };
  validates = () => {
    if (this.validateNombre() !== 'success') return false;
    if (this.validateIdEstacion() !== 'success') return false;
    if (this.validateLatitud() !== 'success') return false;
    if (this.validateLongitud() !== 'success') return false;
    return true;
  };
  formSubmit = ev => {
    if (isPlainClick(ev)) {
      if (!this.validates()) return;
      const st = this.state;
      delete st.duplicado;
      this.props
        .onSave({
          ...st,
          latitud: parseFloat(st.latitud),
          longitud: parseFloat(st.longitud),
        })
        .then(exito => this.setState({ duplicado: !exito }));
    }
  };
  render() {
    const { idEstacion, nombre, latitud, longitud, duplicado } = this.state;
    const position = [parseFloat(latitud), parseFloat(longitud)];
    return (
      <Form>
        <Form.Field
          type="text"
          placeholder="Sigla"
          value={idEstacion}
          onChange={this.idEstacionChange}
        >
          <Form.Label>Sigla</Form.Label>
          <Form.Help>duplicado={duplicado}</Form.Help>
        </Form.Field>

        <Form.Field
          type="text"
          placeholder="Nombre Completo"
          value={nombre}
          onChange={this.nombreChange}
        >
          <Form.Label>Nombre</Form.Label>
        </Form.Field>
        <Row>
          <Col mdOffset={2} md={8} xs={12}>
            <Map center={position} zoom={13} onclick={this.mapClick}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker position={position} />
            </Map>
          </Col>
        </Row>
        <Form.Field className="coords">
          <Form.Label>
            {formatcoords(parseFloat(latitud), parseFloat(longitud)).format(
              'FFf',
              {
                latLonSeparator: ' -- ',
                decimalPlaces: 2,
              },
            )}
          </Form.Label>
        </Form.Field>
        <Form.Field
          type="text"
          placeholder="Latitud"
          value={latitud}
          onChange={this.latitudChange}
        >
          <Form.Label>Latitud</Form.Label>
        </Form.Field>

        <Form.Field
          type="text"
          placeholder="Longitud"
          value={longitud}
          onChange={this.longitudChange}
        >
          <Form.Label>Longitud</Form.Label>
        </Form.Field>

        <Form.Field type="buttonGroup">
          <Button
            type="submit"
            onClick={this.formSubmit}
            disabled={!this.validates()}
          >
            Agregar
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

EditEstacion.propTypes = {
  ...withRouterTypes,
  estacion: estacionShape,
};
