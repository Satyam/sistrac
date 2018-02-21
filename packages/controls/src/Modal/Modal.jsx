import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const isCloseButton = /(^|\s)close-button($|\s)/;

const Modal = ({ children, open, onClose }) => {
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
      className="modal close-button"
      tabIndex="-1"
      role="dialog"
      style={{ display: open ? 'block' : 'none' }}
      onClick={handleClick}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Modal;
