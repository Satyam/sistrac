import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { NavBar } from './src';
import FaBeer from 'react-icons/lib/fa/beer';

ReactDOM.render(
  <BrowserRouter>
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
  </BrowserRouter>,
  document.getElementById('root'),
);
