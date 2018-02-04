import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';

const FormButtons = (
  { children, className, ...props },
  { _reduxForm: { invalid, pristine, submitting, reset } },
) => (
  <div className="form-group row">
    <div
      className={classNames(
        'form-buttons col-sm-12 col-md-8 offset-md-4',
        className,
      )}
      {...props}
    >
      {Children.map(children, child => {
        switch (child.props.type) {
          case 'submit':
            if (submitting || pristine || invalid) {
              return cloneElement(child, {
                disabled: true,
              });
            }
            return child;
            break;
          case 'reset':
            return cloneElement(
              child,
              pristine ? { disabled: true } : { onClick: reset },
            );

          default:
            return child;
        }
      })}
    </div>
  </div>
);

FormButtons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

FormButtons.contextTypes = {
  _reduxForm: PropTypes.shape({
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    reset: PropTypes.func,
  }),
};
export default FormButtons;
