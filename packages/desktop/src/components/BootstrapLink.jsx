import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem as OriginalMenuItem,
  NavItem as OriginalNavItem,
} from 'react-bootstrap';

export const MenuItem = ({ href, ...props }, { router }) => (
  <OriginalMenuItem
    onClick={e => {
      e.preventDefault();
      router.history.push(href);
    }}
    href={href}
    {...props}
  />
);

MenuItem.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.funct,
    }),
  }),
};

export const NavItem = ({ href, ...props }, { router }) => (
  <OriginalNavItem
    onClick={e => {
      e.preventDefault();
      router.history.push(href);
    }}
    href={href}
    {...props}
  />
);

NavItem.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }),
};
