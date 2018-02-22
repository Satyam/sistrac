import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import './styles.css';

const isCloseButton = /(^|\s)close-button($|\s)/;

const Modal = ({ children, open, onClose, centered, size }) => {
  const handleClick = ev => {
    if (
      typeof onClose === 'function' &&
      isCloseButton.test(ev.target.className)
    ) {
      onClose();
    }
  };
  return (
    <div
      className={classNames('modal close-button', { open })}
      tabIndex="-1"
      role="dialog"
      onClick={handleClick}
    >
      <div
        className={classNames('modal-dialog', {
          'modal-dialog-centered': centered,
          'modal-lg': size === 'lg',
          'modal-sm': size === 'sm',
        })}
        role="document"
      >
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  centered: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg']),
};

export default Modal;
