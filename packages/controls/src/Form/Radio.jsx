import React from 'react';
import PropTypes from 'prop-types';
import { Field as ReduxFormField } from 'redux-form';

import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form/es/propTypes';

import './styles.css';

const RadioItem = ({ input, meta, children, ...props }) => (
  <li>
    <input {...props} {...input} type="radio" />
    {children}
  </li>
);

RadioItem.propTypes = {
  children: PropTypes.node,
  input: PropTypes.shape(fieldInputPropTypes),
  meta: PropTypes.shape(fieldMetaPropTypes),
};

const Radio = ({ options, name, rxfProps, ...props }) => (
  <ul className="form-radios">
    {options.map(({ props: { value, ...optionProps } }) => (
      <ReduxFormField
        name={rxfProps.name}
        {...props}
        {...optionProps}
        key={value}
        value={value}
        component={RadioItem}
      />
    ))}
  </ul>
);

Radio.propTypes = {
  options: PropTypes.node,
  name: PropTypes.string,
  rxfProps: PropTypes.shape(fieldInputPropTypes),
};

export default Radio;
