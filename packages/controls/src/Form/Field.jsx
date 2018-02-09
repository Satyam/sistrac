import React, {
  Component,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import { Field as ReduxFormField } from 'redux-form';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form/es/propTypes';

import Radio from './Radio';
import Checkbox from './Checkbox';
import Select from './Select';
import Option from './Option';
import TextInput from './TextInput';
import FormButtons from './FormButtons';
import Label from './Label';
import Help from './Help';
import Button from '../Button/Button';

import RenderField from './RenderField';

import './styles.css';
let counter = 0;

const Field = ({ children, type, id, ...props }) => {
  const commonProps = {
    ...props,
    id,
    type,
  };
  let label, help, Contents;
  const options = [];
  const buttons = [];
  let inputId;
  Children.forEach(children, child => {
    if (!isValidElement(child))
      throw new Error(`Not a valid element in a Form.Field ${child}`);
    if (child.type === Button) {
      buttons.push(child);
    } else if (child.type === Label) {
      label = child;
    } else if (child.type === Help) {
      help = child;
    } else if (child.type === Option) {
      options.push(child);
    } else throw new Error(`Invalid child in a Form.Field ${type}`);
  });
  inputId = id;
  if (label) {
    if (!inputId) inputId = `field-${++counter}`;
    label = cloneElement(label, {
      htmlFor: inputId,
    });
    commonProps.id = inputId;
  }
  switch (type) {
    case 'checkbox':
      Contents = Checkbox;
      break;

    case 'select':
      Contents = Select;
      commonProps.options = options;
      break;
    case 'radio':
      Contents = Radio;
      commonProps.options = options;
      break;
    case 'buttonGroup':
      return <FormButtons {...commonProps}>{buttons}</FormButtons>;
    default:
      Contents = TextInput;
  }
  return (
    <ReduxFormField
      {...commonProps}
      Contents={Contents}
      label={label}
      help={help}
      component={RenderField}
    />
  );
};

Field.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'buttonGroup',
    'text',
    'select',
    'checkbox',
    'radio',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'tel',
    'time',
    'url',
    'week',
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  selected: PropTypes.bool,
  rows: PropTypes.number,
};

export default Field;
