import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Body, Footer } from './';
import { Button } from '../';

const Confirm = ({
  title,
  children,
  yesLabel = 'Ok',
  noLabel = 'Cancel',
  open,
  onConfirm,
}) => (
  <Modal open={open} onClose={() => onConfirm(false)}>
    <Header closeButton>{title}</Header>
    <Body>{children}</Body>
    <Footer>
      <Button color="primary" onClick={() => onConfirm(true)}>
        {yesLabel}
      </Button>
      <Button color="secondary" className="close-button">
        {noLabel}
      </Button>
    </Footer>
  </Modal>
);

Confirm.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  yesLabel: PropTypes.node,
  noLabel: PropTypes.node,
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default Confirm;
