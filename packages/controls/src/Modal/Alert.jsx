import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Body, Footer } from './';
import { Button } from '../';

const Alert = ({
  title,
  children,
  buttonLabel = 'Ok',
  buttonColor = 'primary',
  open,
  onClose,
}) => (
  <Modal open={open} centered onClose={onClose}>
    <Header closeButton>{title}</Header>
    <Body>{children}</Body>
    <Footer>
      <Button color={buttonColor} className="close-button">
        {buttonLabel}
      </Button>
    </Footer>
  </Modal>
);

Alert.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  buttonLabel: PropTypes.node,
  buttonColor: PropTypes.oneOf([
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
  onClose: PropTypes.func,
};

export default Alert;
