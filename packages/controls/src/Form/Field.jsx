import React, {
  Component,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import formShape from './formShape';

import Radio from './Radio';
import Checkbox from './Checkbox';

import './styles.css';

let counter = 0;

class Field extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: props.value };
  }
  onChange = ev => {
    const { value } = ev.target;
    this.setState({ value });
    this.context.form.valueChange(name, value, ev);
  };
  onBlur = ev => {
    const { value } = ev.target;
    this.context.form.blur(name, value, ev);
  };
  render() {
    const {
      children,
      className,
      type,
      name,
      value,
      placeholder,
      id,
      rows,
    } = this.props;
    const commonProps = {
      id,
      name,
      onChange: this.onChange,
      onBlur: this.onBlur,
    };
    let label, help, input, validation;
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
        input = <select {...commonProps}>{options}</select>;
        break;
      default:
        input = rows ? (
          <textarea
            {...commonProps}
            value={value}
            placeholder={placeholder}
            rows={rows}
          />
        ) : (
          <input
            {...commonProps}
            type={type}
            placeholder={placeholder}
            value={value}
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
          {validation}
        </div>
      </div>
    );
  }
}

Field.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  selected: PropTypes.bool,
  rows: PropTypes.number,
};

Field.contextTypes = formShape;
export default Field;
