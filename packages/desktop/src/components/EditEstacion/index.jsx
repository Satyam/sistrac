import React from 'react';
import { Button } from '@devasatyam/controls/lib/Button';
import { Form, Field } from '@devasatyam/controls/lib/Form';
import { Row, Col } from '@devasatyam/controls/lib/Grid';
import { Map, Marker, TileLayer } from 'react-leaflet';
import formatcoords from 'formatcoords';
import simpleMemoize from '_components/utils/simpleMemoize';

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

const EditEstacion = ({
  estacion = {},
  match,
  history,
  existeEstacion,
  onSave,
}) => {
  const { idEstacion = '', nombre = '', latitud = 0, longitud = 0 } = estacion;
  const nueva = !match.params.idEstacion;
  const validateIdEstacion = simpleMemoize(async idEstacion => {
    if (!nueva || idEstacion.length < 3) return;
    const action = await existeEstacion(idEstacion);
    if (action.payload.exists) return 'Sigla en uso';
  });
  const formSubmit = (values, dispatch, props) => {
    console.log('submit', values);
    onSave(nueva, values);
    history.push(nueva ? '/estaciones' : `/estacion/${values.idEstacion}`);
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

  return (
    <Form
      onSubmit={formSubmit}
      initialValues={{
        idEstacion,
        nombre,
        latitud,
        longitud,
      }}
      validate={validate}
      suscription={{
        invalid: true,
        pristine: true,
        submitting: true,
        values: true,
      }}
      warn={warn}
      render={({
        handleSubmit,
        submitting,
        pristine,
        invalid,
        values,
        change,
        batch,
      }) => {
        const position = [
          parseFloat(values.latitud),
          parseFloat(values.longitud),
        ];
        const updateCoords = (latitud, longitud) => {
          batch(() => {
            change('latitud', latitud);
            change('longitud', longitud);
          });
        };
        const mapClick = ev => {
          const { latlng: { lat, lng } } = ev;
          updateCoords(lat, lng);
        };
        const parseCoord = value => parseFloat(value.replace(',', '.'));
        const formatCoord = value => String(value).replace('.', ',');

        if (nueva && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(({ coords }) => {
            updateCoords(coords.latitude, coords.longitude);
          });
        }
        return (
          <form onSubmit={handleSubmit}>
            <Field
              type="text"
              placeholder="Sigla"
              name="idEstacion"
              parse={value => value.toUpperCase()}
              label="Sigla"
              help={
                nueva
                  ? 'Sigla de 3 caracteres de la estación'
                  : 'Estación existente, no puede cambiarse'
              }
              validate={validateIdEstacion}
              disabled={!nueva}
            />

            <Field
              type="text"
              placeholder="Nombre Completo"
              name="nombre"
              label="Nombre"
            />
            <Row className="mb-4">
              <Col mdOffset={4} md={8} xs={12}>
                <Map center={position} zoom={13} onclick={mapClick}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  />
                  <Marker position={position} />
                </Map>
                <div className="coords badge badge-pill badge-secondary">
                  {formatcoords(
                    parseFloat(values.latitud),
                    parseFloat(values.longitud),
                  ).format('FFf', {
                    latLonSeparator: ' -- ',
                    decimalPlaces: 2,
                  })}
                </div>
              </Col>
            </Row>
            <Field
              type="text"
              placeholder="Latitud"
              name="latitud"
              label="Latitud"
              parse={parseCoord}
              format={formatCoord}
              help="Latitud en valor decimal"
            />

            <Field
              type="text"
              placeholder="Longitud"
              name="longitud"
              label="Longitud"
              parse={parseCoord}
              format={formatCoord}
              help="Longitud en valor decimal"
            />

            <Field type="buttonGroup" name="buttons">
              <Button
                type="submit"
                color="primary"
                disabled={submitting || invalid || pristine}
              >
                {nueva ? 'Agregar' : 'Modificar'}
              </Button>
            </Field>
          </form>
        );
      }}
    />
  );
};

EditEstacion.propTypes = {
  ...withRouterTypes,
  estacion: estacionShape,
};

export default EditEstacion;
