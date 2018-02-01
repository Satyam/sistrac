import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Item = ({ selected, children, ...props }) => (
  <li>
    <input {...props} type="radio" checked={selected} />
    {children}
  </li>
);

Item.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
};

const Radio = ({ children, ...commonProps }) => (
  <ul className="form-radios">
    {children.map(({ props: { value, type, ...optionProps } }) => (
      <Item {...commonProps} {...optionProps} key={value} value={value} />
    ))}
  </ul>
);

Radio.propTypes = {
  children: PropTypes.node,
};

export default Radio;
