import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WarningIcon from 'react-icons/lib/go/alert';
import StopIcon from 'react-icons/lib/go/stop';

const RenderField = ({
  Contents,
  label,
  id,
  help,
  className,
  input,
  meta,
  ...props
}) => {
  const { touched, error, warning } = meta;
  return (
    <div className={classNames('form-group row', className)}>
      <div className="col-sm-12 col-md-4 left-label">
        <label htmlFor={id}>{label}</label>
      </div>

      <div className={classNames('col-sm-12 col-md-8')}>
        <Contents id={id} {...props} input={input} meta={meta} />
      </div>
      <div className="offset-sm-0 offset-md-4 col-sm-12 col-md-8">
        <small className="form-text text-muted">{help}</small>
        {touched &&
          ((error && (
            <div className="form-status form-error text-danger">
              <StopIcon />
              {error}
            </div>
          )) ||
            (warning && (
              <div className="form-status form-error text-warning">
                <WarningIcon />
                {warning}
              </div>
            )))}
      </div>
    </div>
  );
};

RenderField.propTypes = {
  Contents: PropTypes.func,
  label: PropTypes.node,
  help: PropTypes.node,
  className: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  id: PropTypes.string,
};

export default RenderField;
