import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { NavBar, Tabs } from './src';
import FaBeer from 'react-icons/lib/fa/beer';

ReactDOM.render(
  <BrowserRouter>
    <div style={{ margin: '0 1em' }}>
      <NavBar brand="algo" href="pepe">
        <NavBar.Menu>
          <NavBar.Item href="/jose">Menu 1</NavBar.Item>
          <NavBar.Item href="/jose" disabled>
            Menu 2
          </NavBar.Item>
          <NavBar.Dropdown label="drpdwn" icon={<FaBeer />} disabled>
            <NavBar.DropdownItem href="pepe1">pepe1</NavBar.DropdownItem>
            <NavBar.DropdownItem href="pepe2">pepe2</NavBar.DropdownItem>
            <NavBar.DropdownItem href="pepe3">pepe3</NavBar.DropdownItem>
          </NavBar.Dropdown>
        </NavBar.Menu>
        <NavBar.Menu right>
          <NavBar.Dropdown label="drpdwnR">
            <NavBar.DropdownItem href="pepe1">pepe1</NavBar.DropdownItem>
            <NavBar.DropdownItem href="pepe2" disabled>
              pepe2
            </NavBar.DropdownItem>
            <NavBar.DropdownItem href="pepe3">pepe3</NavBar.DropdownItem>
          </NavBar.Dropdown>
        </NavBar.Menu>
      </NavBar>
      <Tabs>
        <Tabs.Tab tabId="tab1" title="Tab1" active>
          Tab1 contents
        </Tabs.Tab>
        <Tabs.Tab tabId="tab2" title="Tab2">
          Tab2 contents{' '}
        </Tabs.Tab>
        <Tabs.Tab tabId="tab3" title="Tab3">
          Tab3 contents{' '}
        </Tabs.Tab>
      </Tabs>
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
