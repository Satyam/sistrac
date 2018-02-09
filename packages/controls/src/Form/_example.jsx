import React from 'react';
import Form from './';
import { Button } from '..';

const validate = values => {
  const errors = {};
  if (values.texto.length < 3) {
    errors.texto = 'muy corto';
  }
  if (values.checkbox) {
    errors.checkbox = 'debe ser falso';
  }
  if (values.grupo === '2') {
    errors.grupo = 'no puede ser dos';
  }
  if (values.select === '2') {
    errors.select = 'no puede ser dos';
  }
  return errors;
};

const example = () => (
  <fieldset>
    <legend>fieldset??</legend>
    <Form
      name="prueba"
      initialValues={{
        texto: 'textoInicial',
        checkbox: true,
        grupo: '2',
        select: '3',
      }}
      validate={validate}
    >
      <Form.Field type="text" name="texto">
        <Form.Label>Etiqueta texto</Form.Label>
        <Form.Help>ayuda texto</Form.Help>
      </Form.Field>
      <Form.Field type="checkbox" name="checkbox" placeholder="alguito">
        <Form.Label>Etiqueta checkbox</Form.Label>
        <Form.Help>ayuda checkbox</Form.Help>
      </Form.Field>
      <Form.Field type="radio" name="grupo">
        <Form.Label>Options grupo:</Form.Label>
        <Form.Option value="1">uno</Form.Option>
        <Form.Option value="2">dos</Form.Option>
        <Form.Option value="3">tres </Form.Option>
        <Form.Help>ayuda grupo</Form.Help>
      </Form.Field>
      <Form.Field type="select" name="select">
        <Form.Label>Options select:</Form.Label>
        <Form.Option value="1">uno</Form.Option>
        <Form.Option value="2">dos</Form.Option>
        <Form.Option value="3">tres </Form.Option>
        <Form.Help>ayuda select</Form.Help>
      </Form.Field>
      <Form.Field type="buttonGroup" name="buttonGroup">
        <Button type="submit" color="primary">
          Ok
        </Button>
        <Button type="reset">Reset</Button>
      </Form.Field>
    </Form>
  </fieldset>
);

export default example;
