import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Button,
  HelpBlock,
  Label,
  Glyphicon,
} from 'react-bootstrap';
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
      <Form horizontal>
        <FormGroup
          controlId="idEstacion"
          validationState={this.validateIdEstacion()}
        >
          <Col componentClass={ControlLabel} mdOffset={2} md={2} xs={3}>
            Sigla
          </Col>
          <Col md={6} xs={9}>
            <FormControl
              type="text"
              placeholder="Sigla"
              value={idEstacion}
              onChange={this.idEstacionChange}
            />
            <FormControl.Feedback />
            {duplicado && <HelpBlock>duplicado</HelpBlock>}
          </Col>
        </FormGroup>

        <FormGroup controlId="nombre" validationState={this.validateNombre()}>
          <Col componentClass={ControlLabel} mdOffset={2} md={2} xs={3}>
            Nombre
          </Col>
          <Col md={6} xs={9}>
            <FormControl
              type="text"
              placeholder="Nombre Completo"
              value={nombre}
              onChange={this.nombreChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col mdOffset={2} md={8} xs={12}>
            <Map center={position} zoom={13} onclick={this.mapClick}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker position={position} />
            </Map>
          </Col>
        </FormGroup>
        <FormGroup className="coords">
          <Label>
            {formatcoords(parseFloat(latitud), parseFloat(longitud)).format(
              'FFf',
              {
                latLonSeparator: ' -- ',
                decimalPlaces: 2,
              },
            )}
          </Label>
        </FormGroup>
        <FormGroup controlId="latitud" validationState={this.validateLatitud()}>
          <Col componentClass={ControlLabel} mdOffset={2} md={2} xs={3}>
            Latitud
          </Col>
          <Col md={6} xs={9}>
            <FormControl
              type="text"
              placeholder="Latitud"
              value={latitud}
              onChange={this.latitudChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup
          controlId="longitud"
          validationState={this.validateLongitud()}
        >
          <Col componentClass={ControlLabel} mdOffset={2} md={2} xs={3}>
            Longitud
          </Col>
          <Col md={6} xs={9}>
            <FormControl
              type="text"
              placeholder="Longitud"
              value={longitud}
              onChange={this.longitudChange}
            />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col mdOffset={4} md={6} xsOffset={3} xs={9}>
            <Button
              type="submit"
              onClick={this.formSubmit}
              disabled={!this.validates()}
            >
              Agregar
            </Button>{' '}
            <div className="btn btn-success">
              <Glyphicon glyph="ok" />
            </div>{' '}
            <div className="btn btn-danger">
              <Glyphicon glyph="remove" />
            </div>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

EditEstacion.propTypes = {
  ...withRouterTypes,
  estacion: estacionShape,
};
