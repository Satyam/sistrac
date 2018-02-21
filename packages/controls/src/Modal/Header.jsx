import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Header = ({ children, className, closeButton, ...props }) => (
  <div className="modal-header bg-light">
    <div className={classNames('modal-title', className)} {...props}>
      {children}
    </div>
    {closeButton && (
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true" className="close-button">
          &times;
        </span>
      </button>
    )}
  </div>
);

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
};

export default Header;
