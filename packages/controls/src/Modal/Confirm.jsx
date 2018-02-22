import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Body, Footer } from './';
import { Button } from '../';

const Confirm = ({
  title,
  children,
  yesLabel = 'Ok',
  yesColor = 'primary',
  noLabel = 'Cancel',
  noColor = 'secondary',
  open,
  onConfirm,
}) => (
  <Modal centered open={open} onClose={() => onConfirm(null)}>
    <Header closeButton>{title}</Header>
    <Body>{children}</Body>
    <Footer>
      <Button color={yesColor} onClick={() => onConfirm(true)}>
        {yesLabel}
      </Button>
      <Button color={noColor} onClick={() => onConfirm(false)}>
        {noLabel}
      </Button>
    </Footer>
  </Modal>
);

Confirm.propTypes = {
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
  onConfirm: PropTypes.func,
};

export default Confirm;
