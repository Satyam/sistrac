import React, { Component, Fragment, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import './styles.css';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleTabClick = tabId => {
    const { tabGroup, history } = this.props;
    const url = new URL(location);
    const params = url.searchParams;
    params.set(tabGroup, tabId);
    history.replace(`?${params}`);
    this.setState({ activeTab: tabId });
  };
  render() {
    const { className, tabGroup, children } = this.props;
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
            if (!tabContents && active) {
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
  history: PropTypes.object,
};
export default withRouter(Tabs);
