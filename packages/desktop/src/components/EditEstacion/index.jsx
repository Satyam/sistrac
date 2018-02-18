import React, { Component } from 'react';
import { Button } from '@devasatyam/controls/lib/Button';
import Form from '@devasatyam/controls/lib/Form';
import { Row, Col } from '@devasatyam/controls/lib/Grid';
import { Map, Marker, TileLayer } from 'react-leaflet';
import formatcoords from 'formatcoords';
import isPlainClick from '_components/utils/isPlainClick';

import { withRouterTypes, estacionShape } from '_src/shapes';

import './styles.css';

const validate = ({ idEstacion, nombre, latitud, longitud }) => {
  const errors = {};
  if (latitud > 90 || latitud < -90) {
    errors.latitud = 'Latitud debe ser menor que 90 norte o sur';
  }
  if (longitud > 180 || longitud < -180) {
    errors.longitud = 'Longitud debe ser menor que 180 este u oeste';
  }
  if (idEstacion.length !== 3) {
    errors.idEstacion = 'La sigla de la estación debe ser de 3 caracteres';
  }
  return errors;
};
const warn = ({ idEstacion, nombre, latitud, longitud }) => {
  const warnings = {};
  if (nombre.length < 3) {
    warnings.nombre = 'No son recomendables nombres de estación tan cortos';
  }
  return warnings;
};
const asyncValidate = (values, dispatch, props, field) => {
  console.log('asyncValidate', values, props, field);
  // return Promise.reject({ idEstacion: 'duplicado' });
  return Promise.resolve();
};

const formSubmit = (values, dispatch, props) => {
  console.log('submit', values, props);
};
class EditEstacion extends Component {
  constructor(props) {
    super(props);
    const { latitud = 0, longitud = 0, match } = props;
    const nueva = !match.params.idEstacion;
    if (nueva && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.setState({ latitud: coords.latitude, longitud: coords.longitude });
      });
    }
    this.state = {
      latitud,
      longitud,
      nueva,
    };
  }
  //    const idEstacion = match.params.idEstacion;
  // }
  //
  // latitudChange = ev => {
  //   this.setState({ latitud: ev.target.value.replace(',', '.') });
  // };
  // longitudChange = ev => {
  //   this.setState({ longitud: ev.target.value.replace(',', '.') });
  // };
  mapClick = ev => {
    const { latlng: { lat, lng } } = ev;
    this.setState({
      latitud: lat,
      longitud: lng,
    });
  };
  // formSubmit = ev => {
  //   if (isPlainClick(ev)) {
  //     if (!this.validates()) return;
  //     const st = this.state;
  //     delete st.duplicado;
  //     this.props
  //       .onSave({
  //         ...st,
  //         latitud: parseFloat(st.latitud),
  //         longitud: parseFloat(st.longitud),
  //       })
  //       .then(exito => this.setState({ duplicado: !exito }));
  //   }
  // };

  render() {
    const { latitud, longitud, nueva } = this.state;
    const { idEstacion = '', nombre = '' } = this.props;
    const position = [parseFloat(latitud), parseFloat(longitud)];
    return (
      <Form
        name="editEstacion"
        initialValues={{
          idEstacion,
          nombre,
          latitud,
          longitud,
        }}
        validate={validate}
        warn={warn}
        asyncValidate={asyncValidate}
        asyncBlurFields={['idEstacion']}
        enableReinitialize
        keepDirtyOnReinitialize
        onSubmit={formSubmit}
      >
        <Form.Field
          type="text"
          placeholder="Sigla"
          name="idEstacion"
          parse={value => value.toUpperCase()}
        >
          <Form.Label>Sigla</Form.Label>
          <Form.Help>Sigla de 3 caracteres de la estación</Form.Help>
        </Form.Field>

        <Form.Field type="text" placeholder="Nombre Completo" name="nombre">
          <Form.Label>Nombre</Form.Label>
        </Form.Field>
        <Row className="mb-4">
          <Col mdOffset={4} md={8} xs={12}>
            <Map center={position} zoom={13} onclick={this.mapClick}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker position={position} />
            </Map>
            <div className="coords badge badge-pill badge-secondary">
              {formatcoords(parseFloat(latitud), parseFloat(longitud)).format(
                'FFf',
                {
                  latLonSeparator: ' -- ',
                  decimalPlaces: 2,
                },
              )}
            </div>
          </Col>
        </Row>
        <Form.Field type="text" placeholder="Latitud" name="latitud">
          <Form.Label>Latitud</Form.Label>
        </Form.Field>

        <Form.Field type="text" placeholder="Longitud" name="longitud">
          <Form.Label>Longitud</Form.Label>
        </Form.Field>

        <Form.Field type="buttonGroup" name="buttons">
          <Button type="submit" color="primary">
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

export default EditEstacion;
