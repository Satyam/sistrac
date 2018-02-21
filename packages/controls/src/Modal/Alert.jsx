import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Body, Footer } from './';
import { Button } from '../';

const Alert = ({ title, children, buttonLabel = 'Ok', open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Header closeButton>{title}</Header>
    <Body>{children}</Body>
    <Footer>
      <Button color="primary" className="close-button">
        {buttonLabel}
      </Button>
    </Footer>
  </Modal>
);

Alert.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  buttonLabel: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Alert;
