import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const FormButtons = ({ buttons }) => (
  <div className="form-group row">
    <div className="form-buttons col-sm-12 col-md-8 offset-md-4">{buttons}</div>
  </div>
);

FormButtons.propTypes = {
  buttons: PropTypes.node,
};
export default FormButtons;
