import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// color coordinado texto y fondo.

const Search = ({
  className,
  children = 'Search',
  placeholder,
  onSearch,
  color,
  outline,
  btnClassName,
  inputClassName,
}) => {
  const handleSubmit = ev => {
    ev.preventDefault();
    if (onSearch) onSearch(ev.target.elements.search.value, ev);
  };
  return (
    <form
      className={classNames('form-inline', className)}
      onSubmit={handleSubmit}
    >
      <div className="input-group">
        <input
          className={classNames('form-control', inputClassName)}
          type="search"
          placeholder={placeholder}
          aria-label="Search"
          name="search"
        />
        <div className="input-group-append">
          <button
            className={classNames(
              'btn',
              color && (outline ? `btn-outline-${color}` : `btn-${color}`),
              btnClassName,
            )}
            type="submit"
          >
            {children}
          </button>
        </div>
      </div>
    </form>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  color: PropTypes.oneOf([
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
  outline: PropTypes.bool,
  btnClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default Search;
