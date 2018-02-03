import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { OK, WARN, ERROR } from './';

const SimpleForm = ({ handleSubmit, children }) => (
  <form onSubmit={handleSubmit}>{children}</form>
);
SimpleForm.propTypes = {
  handleSubmit: PropTypes.func,
  children: PropTypes.node,
};
class Form extends Component {
  constructor(props, context) {
    super(props, context);
    const { children, name, ...rProps } = props;
    this.state = {
      ReducedForm: reduxForm({ form: props.name, ...rProps })(SimpleForm),
    };
  }
  render() {
    const { children, onSubmit } = this.props;
    const { ReducedForm } = this.state;
    return <ReducedForm onSubmit={onSubmit}>{children}</ReducedForm>;
  }
}

Form.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;
