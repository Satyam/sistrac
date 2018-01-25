import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { NavBar, Tabs, Grid, Row, Col, Jumbotron, Table, Form } from './src';
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
      <fieldset>
        <legend>fieldset??</legend>
        <Form>
          <Form.Field type="text" name="uno" value="algo">
            <Form.Label>Etiqueta</Form.Label>
            <Form.Help>ayuda</Form.Help>
          </Form.Field>
          <Form.Field type="checkbox" name="uno" value="algo">
            <Form.Label>Etiqueta</Form.Label>
            <Form.Help>ayuda</Form.Help>
          </Form.Field>
          <Form.Field type="radio" name="grupo">
            <Form.Label>Options:</Form.Label>
            <Form.Option value="1">uno</Form.Option>
            <Form.Option value="2">dos</Form.Option>
            <Form.Option value="3">tres </Form.Option>
            <Form.Help>ayuda</Form.Help>
          </Form.Field>
        </Form>
      </fieldset>
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
      <Grid>
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
          <Col xs={2}>Below</Col>
          <Col xs={2} xsHideBelow>
            xs
          </Col>
          <Col xs={2} smHideBelow>
            sm
          </Col>
          <Col xs={2} mdHideBelow>
            md
          </Col>
          <Col xs={2} lgHideBelow>
            lg
          </Col>
          <Col xs={2} xlHideBelow>
            xl
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={2}>Above</Col>
          <Col xs={2} xsHideAbove>
            xs
          </Col>
          <Col xs={2} smHideAbove>
            sm
          </Col>
          <Col xs={2} mdHideAbove>
            md
          </Col>
          <Col xs={2} lgHideAbove>
            lg
          </Col>
          <Col xs={2} xlHideAbove>
            xl
          </Col>
        </Row>
      </Grid>
      <Jumbotron>
        <h1>Important info</h1> not so much
      </Jumbotron>
      <Table hover dark>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
