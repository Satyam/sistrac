import React, {
  Component,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WarningIcon from 'react-icons/lib/go/alert';
import StopIcon from 'react-icons/lib/go/stop';

import Radio from './Radio';
import Checkbox from './Checkbox';

import { OK, WARN, ERROR } from './';
import './styles.css';

let counter = 0;

class Field extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {
      children,
      className,
      type,
      name,
      placeholder,
      id,
      rows,
      ...props
    } = this.props;
    const commonProps = {
      ...props,
      id,
      name,
    };
    let label, help, input;
    const options = [];
    const buttons = [];
    const labelLeft = type !== 'checkbox';
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
        className: classNames(label.props.className, {
          'form-check-label': !labelLeft,
        }),
      });
    }
    switch (type) {
      case 'checkbox':
        input = <Checkbox {...commonProps}>{label}</Checkbox>;
        break;
      case 'radio':
        input = <Radio {...commonProps}>{options}</Radio>;
        break;
      case 'select':
        input = (
          <select className="form-control" {...commonProps}>
            {options}
          </select>
        );
        break;
      case 'buttonGroup':
        input = <div className="form-buttons">{buttons}</div>;
        break;
      default:
        input = rows ? (
          <textarea
            {...commonProps}
            className="form-control"
            placeholder={placeholder}
            rows={rows}
          />
        ) : (
          <input
            {...commonProps}
            className="form-control"
            type={type}
            placeholder={placeholder}
          />
        );
    }
    return (
      <div className={classNames('form-group row', className)}>
        <div className="col-sm-12 col-md-4 left-label">
          {labelLeft && label}
        </div>

        <div className={classNames('col-sm-12 col-md-8')}>{input}</div>
        <div className="offset-sm-0 offset-md-4 col-sm-12 col-md-8">
          {help}
          {
            // {status !== OK && (
            //   <div
            //     className={classNames('form-status', {
            //       'field-warning': status === WARN,
            //       'field-error': status === ERROR,
            //     })}
            //   >
            //     {(status === WARN && WarningIcon) ||
            //       (status === ERROR && StopIcon)}
            //     {error}
            //   </div>
            // )}
          }
        </div>
      </div>
    );
  }
}

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
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  selected: PropTypes.bool,
  rows: PropTypes.number,
};

export default Field;
