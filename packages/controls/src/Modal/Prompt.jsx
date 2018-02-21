import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Body, Footer } from './';
import { Button } from '../';

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
      noLabel = 'Cancel',
      placeholder,
      open,
      onConfirm,
    } = this.props;
    return (
      <Modal open={open} onClose={this.handleClose}>
        <Header closeButton>{title}</Header>
        <Body>
          <div>{children}</div>
          <div>
            <input
              className="form-control mt-2"
              value={this.state.value}
              placeholder={placeholder}
              onChange={this.handleChange}
            />
          </div>
        </Body>
        <Footer>
          <Button
            color="primary"
            className="close-button"
            onClick={this.handleSubmit}
          >
            {yesLabel}
          </Button>
          <Button color="secondary" className="close-button">
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
  noLabel: PropTypes.node,
  open: PropTypes.bool,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  onConfirm: PropTypes.func,
  reset: PropTypes.bool,
};

export default Prompt;
