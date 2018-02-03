import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WarningIcon from 'react-icons/lib/go/alert';
import StopIcon from 'react-icons/lib/go/stop';

import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form/es/propTypes';

const RenderField = ({
  Contents,
  label,
  help,
  className,
  input,
  meta: { touched, error, warning },
  ...props
}) => (
  <div className={classNames('form-group row', className)}>
    <div className="col-sm-12 col-md-4 left-label">{label}</div>

    <div className={classNames('col-sm-12 col-md-8')}>
      <Contents {...props} {...input} />
    </div>
    <div className="offset-sm-0 offset-md-4 col-sm-12 col-md-8">
      {help}
      {touched &&
        ((error && (
          <div className="form-status form-error">
            <StopIcon />
            {error}
          </div>
        )) ||
          (warning && (
            <div className="form-status form-error">
              <WarningIcon />
              {warning}
            </div>
          )))}
    </div>
  </div>
);

RenderField.propTypes = {
  Contents: PropTypes.node,
  label: PropTypes.node,
  help: PropTypes.node,
  className: PropTypes.string,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default RenderField;
