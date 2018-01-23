import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { NavBar, Tabs, Grid, Row, Col } from './src';
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
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <code>&lt;{'Col xs={12} md={8}'} /&gt;</code>
          </Col>
          <Col xs={6} md={4}>
            <code>&lt;{'Col xs={6} md={4}'} /&gt;</code>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} xsOffset={6}>
            <code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col md={6} mdOrder={6}>
            <code>&lt;{'Col md={6} mdOrder={6}'} /&gt;</code>
          </Col>
          <Col md={6} mdOrder={0}>
            <code>&lt;{'Col md={6} mdOrder={0}'} /&gt;</code>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={2} xsHidden>
            xs
          </Col>
          <Col xs={2} smHidden>
            sm
          </Col>
          <Col xs={2} mdHidden>
            md
          </Col>
          <Col xs={2} lgHidden>
            lg
          </Col>
          <Col xs={2} xlHidden>
            xl
          </Col>
        </Row>
      </Grid>
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
