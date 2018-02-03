import React from 'react';
import PropTypes from 'prop-types';
import { formValues } from 'redux-form';
import './styles.css';

const RadioItem = ({ children, grupo, value, ...props }) => (
  <li>
    <input {...props} checked={grupo === value} value={value} type="radio" />
    {children}
  </li>
);

RadioItem.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
  grupo: PropTypes.string,
  value: PropTypes.string,
};

const Radio = ({ name, options, ...props }) => {
  console.log('Radio commonProps', props);
  const RI = formValues(name)(RadioItem);
  return (
    <ul className="form-radios">
      {options.map(({ props: { value, ...optionProps } }) => {
        console.log('Radio children map', value, optionProps);
        return (
          <RI
            {...props}
            {...optionProps}
            key={value}
            value={value}
            name={name}
          />
        );
      })}
    </ul>
  );
};

Radio.propTypes = {
  options: PropTypes.node,
};

export default Radio;
