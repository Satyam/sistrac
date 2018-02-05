import React, { Component, Fragment, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import './styles.css';

class Tabs extends Component {
  constructor(props) {
    super(props);
    let { activeTab } = props;
    if (!activeTab) {
      activeTab = Children.toArray(props.children)[0].props.tabId;
    }
    this.state = { activeTab };
  }
  handleTabClick = tabId => {
    const { tabGroup, history, onTabClick } = this.props;
    const { activeTab } = this.state;
    if (tabId === activeTab) return;
    if (onTabClick && onTabClick(tabId, activeTab) === false) return;
    if (tabGroup) {
      const url = new URL(location);
      const params = url.searchParams;
      params.set(tabGroup, tabId);
      history.replace(`?${params}`);
    }
    this.setState({ activeTab: tabId });
  };
  render() {
    const { className, children } = this.props;
    const { activeTab } = this.state;
    let tabContents;
    return (
      <Fragment>
        <ul className={classNames('nav nav-tabs', className)}>
          {Children.map(children, Child => {
            const { tabId, active, children } = Child.props;

            if (tabId === activeTab) {
              tabContents = children;
            }
            return cloneElement(Child, {
              onTabClick: this.handleTabClick,
              active: activeTab ? tabId === activeTab : active,
            });
          })}
        </ul>
        <div className="border border-top-0 p-3">{tabContents}</div>
      </Fragment>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tabGroup: PropTypes.string,
  activeTab: PropTypes.string,
  onTabClick: PropTypes.func,
  history: PropTypes.object,
};
export default withRouter(Tabs);
