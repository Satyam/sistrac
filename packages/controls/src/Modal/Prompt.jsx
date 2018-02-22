import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Body, Footer } from './';
import { Button } from '../';

import './styles.css';

class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.initialValue || '' };
  }
  handleChange = ev => {
    this.setState({ value: ev.target.value });
  };
  handleSubmit = ev => {
    const { onConfirm } = this.props;
    if (onConfirm) onConfirm(this.state.value);
  };
  handleClose = ev => {
    const { onConfirm } = this.props;
    if (onConfirm) onConfirm(null);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.setState({ value: nextProps.initialValue || '' });
    }
  }
  render() {
    const {
      title,
      children,
      yesLabel = 'Ok',
      yesColor = 'primary',
      noLabel = 'Cancel',
      noColor = 'secondary',
      placeholder,
      open,
      onConfirm,
    } = this.props;
    return (
      <Modal open={open} centered onClose={this.handleClose}>
        <Header closeButton>{title}</Header>
        <Body>
          <div>{children}</div>
          <div>
            <input
              className="form-control"
              value={this.state.value}
              placeholder={placeholder}
              onChange={this.handleChange}
            />
          </div>
        </Body>
        <Footer>
          <Button
            color={yesColor}
            className="close-button"
            onClick={this.handleSubmit}
          >
            {yesLabel}
          </Button>
          <Button color={noColor} className="close-button">
            {noLabel}
          </Button>
        </Footer>
      </Modal>
    );
  }
}
Prompt.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  yesLabel: PropTypes.node,
  yesColor: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'link',
  ]),
  noLabel: PropTypes.node,
  noColor: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'link',
  ]),
  open: PropTypes.bool,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  onConfirm: PropTypes.func,
  reset: PropTypes.bool,
};

export default Prompt;
