import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Radio = ({ children, ...commonProps }) => (
  <ul className="form-radios">
    {children.map(({ props }) => (
      <li key={props.value}>
        <input
          type="radio"
          value={props.value}
          checked={props.selected}
          {...commonProps}
        />
        {props.children}
      </li>
    ))}
  </ul>
);

Radio.propTypes = {
  children: PropTypes.node,
};

export default Radio;
