import React from 'react';
import Tabs from './';

import FaBeer from 'react-icons/lib/fa/beer';

const handleTabClick = (tabId, activeTab) => {
  console.log('onTabClick', tabId, activeTab);
  return; // tabId !== 'tab2';
};

const example = () => (
  <Tabs tabGroup="tabGroup" onTabClick={handleTabClick}>
    <Tabs.Tab
      tabId="tab1"
      label={
        <div>
          <FaBeer />tab1
        </div>
      }
    >
      Tab1 contents
    </Tabs.Tab>
    <Tabs.Tab tabId="tab2" label="Tab2">
      Tab2 contents
    </Tabs.Tab>
    <Tabs.Tab tabId="tab3" label="Tab3">
      Tab3 contents
    </Tabs.Tab>
  </Tabs>
);

export default example;
