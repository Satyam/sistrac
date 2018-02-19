import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const RadioItem = ({ children, ...props }) => (
  <li>
    <input {...props} type="radio" />
    {children}
  </li>
);

RadioItem.propTypes = {
  children: PropTypes.node,
};

const Radio = ({ options, name, meta, input, ...props }) => {
  const handleChange = ev => {
    input.onChange(ev);
  };
  return (
    <ul className="form-radios" {...input}>
      {options.map(({ props: { value, ...optionProps } }) => (
        <RadioItem
          name={input.name}
          {...optionProps}
          key={value}
          value={value}
          onChange={handleChange}
          checked={value == input.value}
        />
      ))}
    </ul>
  );
};

Radio.propTypes = {
  options: PropTypes.node,
  name: PropTypes.string,
};

export default Radio;
