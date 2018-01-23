import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

let counter = 0;

class Tabs extends Component {
  constructor(...args) {
    super(...args);
    this.tabGroup = `tabGroup${++counter}`;
  }
  render() {
    const url = new URL(location);
    const activeTab = url.searchParams.get(this.tabGroup);
    let tabContents;
    return (
      <React.Fragment>
        <ul className={classNames('nav nav-tabs', this.props.classNames)}>
          {Children.map(this.props.children, Child => {
            if (Child.props.tabId === activeTab) {
              tabContents = Child.props.children;
            }
            return cloneElement(Child, {
              tabGroup: this.tabGroup,
            });
          })}
        </ul>
        <div className="border border-top-0 p-3">{tabContents}</div>
      </React.Fragment>
    );
  }
}
Tabs.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string,
};
export default Tabs;
