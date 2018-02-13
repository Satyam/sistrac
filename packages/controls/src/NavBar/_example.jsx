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
      <NavBar.Group>
        <NavBar.Button href="/jose">Menu 1</NavBar.Button>
        <NavBar.Button href="/jose" disabled>
          Menu 2
        </NavBar.Button>
        <NavBar.Menu
          label={
            <span>
              <FaBeer /> drpdwn
            </span>
          }
          disabled
        >
          <NavBar.Item href="pepe1">pepe1</NavBar.Item>
          <NavBar.Item href="pepe2">pepe2</NavBar.Item>
          <NavBar.Item href="pepe3">pepe3</NavBar.Item>
        </NavBar.Menu>
      </NavBar.Group>
      <NavBar.Group right>
        <NavBar.Menu label="drpdwnR">
          <NavBar.Item href="pepe1">pepe1</NavBar.Item>
          <NavBar.Item href="pepe2" disabled>
            pepe2
          </NavBar.Item>
          <NavBar.Item href="pepe3">pepe3</NavBar.Item>
        </NavBar.Menu>
      </NavBar.Group>
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
