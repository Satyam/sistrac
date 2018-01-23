import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

let counter = 0;

class Tab extends Component {
  isActiveTab() {
    const { active, tabId, tabGroup } = this.props;
    const url = new URL(location);
    const activeTab = url.searchParams.get(tabGroup);
    return activeTab ? activeTab === tabId : active;
  }
  onTabClick = ev => {
    ev.preventDefault();
    const { tabId, history, tabGroup } = this.props;
    if (this.isActiveTab()) return;
    const url = new URL(location);
    const params = url.searchParams;
    params.set(tabGroup, tabId);
    history.replace(`?${params}`);
  };
  render() {
    const { tabId, disabled, title, className } = this.props;
    return (
      <li key={tabId} className={classNames('nav-item', className)}>
        <a
          onClick={this.onTabClick}
          className={classNames('nav-link', {
            active: this.isActiveTab(),
            disabled,
          })}
          href="#"
        >
          {title}
        </a>
      </li>
    );
  }
}
Tab.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  tabId: PropTypes.string.isRequired,
  tabGroup: PropTypes.string.isRequired,
  history: PropTypes.object,
  className: PropTypes.string,
};

export default withRouter(Tab);
