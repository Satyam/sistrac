import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.css';

const Tabs = ({ className, tabGroup, children }) => {
  const url = new URL(location);
  const activeTab = url.searchParams.get(tabGroup);
  let tabContents;
  return (
    <React.Fragment>
      <ul className={classNames('nav nav-tabs', className)}>
        {Children.map(children, Child => {
          if (Child.props.tabId === activeTab) {
            tabContents = Child.props.children;
          }
          if (!tabContents && Child.props.active) {
            tabContents = Child.props.children;
          }
          return cloneElement(Child, {
            tabGroup: tabGroup,
          });
        })}
      </ul>
      <div className="border border-top-0 p-3">{tabContents}</div>
    </React.Fragment>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tabGroup: PropTypes.string,
};
export default Tabs;
