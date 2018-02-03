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
import TextInput from './TextInput';

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
    switch (child.type.name) {
      case 'Button':
        buttons.push(child);
        break;
      case 'Label':
        label = child;
        break;
      case 'Help':
        help = child;
        break;
      case 'Option':
        options.push(child);
        break;
      default:
        throw new Error(`Invalid child in a Form.Field ${type}`);
    }
  });
  inputId = id;
  if (label) {
    if (!inputId) inputId = `field-${++counter}`;
    label = cloneElement(label, {
      htmlFor: inputId,
    });
  }
  switch (type) {
    case 'checkbox':
      Contents = Checkbox;
      break;
    case 'radio':
      Contents = Radio;
      commonProps.options = options;
      break;
    case 'select':
      Contents = Select;
      commonProps.options = options;
      break;
    case 'buttonGroup':
      return (
        <div className="form-group row">
          <div className="form-buttons col-sm-12 col-md-8 offset-md-4">
            {buttons}
          </div>
        </div>
      );
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
