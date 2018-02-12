import React from 'react';
import NavBar from './';
import FaBeer from 'react-icons/lib/fa/beer';

const example = () => (
  <div style={{ paddingTop: '4em' }}>
    <p>first item</p>
    <p>lots of nonsense</p>
    <p>lots of nonsense</p>
    <p>lots of nonsense</p>
    <p>lots of nonsense</p>
    <p>end of top</p>
    <NavBar
      brand="algo"
      href="pepe"
      position="top"
      breakpoint="md"
      background="light"
      external
    >
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
    <p>start of bottom</p>
    <p>lots of nonsense</p>
    <p>lots of nonsense</p>
    <p>lots of nonsense</p>
    <p>lots of nonsense</p>
    <p>lots of nonsense</p>
    <p>last item</p>
  </div>
);

export default example;
