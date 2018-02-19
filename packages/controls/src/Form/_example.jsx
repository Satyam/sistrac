import React from 'react';
import Field from './';
import { Button } from '..';
import { Form } from 'react-final-form';

const validate = values => {
  console.log('validate values', values);
  const errors = {};
  if (values.texto.length < 3) {
    errors.texto = 'muy corto';
  }
  if (values.checkbox) {
    errors.checkbox = 'debe ser falso';
  }
  if (values.grupo === 2) {
    errors.grupo = 'no puede ser dos';
  }
  if (values.select === 2) {
    errors.select = 'no puede ser dos';
  }
  console.log('validate errors', errors);
  return errors;
};

const onSubmit = values => {
  console.log('submit', values);
};
const parseNumber = (...args) => {
  console.log('parse', ...args);
  return Number(args[0]);
};
const formatNumber = (...args) => {
  console.log('format', ...args);
  return String(args[0]);
};
const example = () => (
  <Form
    initialValues={{
      texto: 'textoInicial',
      checkbox: true,
      grupo: 1,
      select: 3,
    }}
    validate={validate}
    onSubmit={onSubmit}
    suscription={{ invalid: true, pristine: true, submitting: true }}
    render={({
      handleSubmit,
      change,
      reset,
      batch,
      submitting,
      pristine,
      invalid,
    }) => {
      return (
        <form onSubmit={handleSubmit}>
          <Field
            type="text"
            name="texto"
            label="Etiqueta texto"
            help="ayuda texto"
          />
          <Field
            type="checkbox"
            name="checkbox"
            placeholder="alguito"
            label="Etiqueta checkbox"
            help="ayuda checkbox"
          />
          <Field
            type="radio"
            name="grupo"
            format={formatNumber}
            parse={parseNumber}
            label="Options grupo:"
            help="ayuda grupo"
          >
            <option value={1}>uno</option>
            <option value={2}>dos</option>
            <option value={3}>tres </option>
          </Field>
          <Field
            type="select"
            name="select"
            format={formatNumber}
            parse={parseNumber}
            label="Options select:"
            help="ayuda select"
          >
            <option value={1}>uno</option>
            <option value={2}>dos</option>
            <option value={3}>tres </option>
          </Field>
          <Field type="buttonGroup" name="buttonGroup">
            <Button
              type="submit"
              color="primary"
              disabled={submitting || invalid || pristine}
            >
              Ok
            </Button>
            <Button type="reset" onClick={reset} disabled={pristine}>
              Reset
            </Button>
          </Field>
        </form>
      );
    }}
  />
);

export default example;
