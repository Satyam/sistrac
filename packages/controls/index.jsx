import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import {
  NavBar,
  Tabs,
  Grid,
  Row,
  Col,
  Jumbotron,
  Table,
  Form,
  Button,
  ButtonGroup,
} from './src';
import FaBeer from 'react-icons/lib/fa/beer';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
const reducers = combineReducers({
  form: formReducer,
});
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
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
        <Button>nada</Button>
        <Button color="secondary">secondary</Button>
        <Button color="secondary" active>
          secondary active
        </Button>
        <Button color="secondary" toggle>
          secondary toggle
        </Button>
        <Button color="primary">primary</Button>
        <Button href="algo" color="info">
          href, info
        </Button>
        <Button color="warning" outline>
          warning, outline
        </Button>
        <Button disabled>disabled</Button>
        <Button size="sm">sm</Button>
        <hr />
        <ButtonGroup
          color="primary"
          outline
          toggle
          onToggle={name => console.log(name)}
        >
          <Button name="uno">uno</Button>
          <Button name="dos">dos</Button>
          <Button name="tres">tres</Button>
        </ButtonGroup>
        <fieldset>
          <legend>fieldset??</legend>
          <Form
            name="prueba"
            initialValues={{
              texto: 'textoInicial',
              checkbox: true,
              grupo: '2',
              select: '3',
            }}
          >
            <Form.Field type="text" name="texto">
              <Form.Label>Etiqueta texto</Form.Label>
              <Form.Help>ayuda texto</Form.Help>
            </Form.Field>
            <Form.Field type="checkbox" name="checkbox" placeholder="alguito">
              <Form.Label>Etiqueta checkbox</Form.Label>
              <Form.Help>ayuda checkbox</Form.Help>
            </Form.Field>
            <Form.Field type="radio" name="grupo">
              <Form.Label>Options grupo:</Form.Label>
              <Form.Option value="1">uno</Form.Option>
              <Form.Option value="2">dos</Form.Option>
              <Form.Option value="3">tres </Form.Option>
              <Form.Help>ayuda grupo</Form.Help>
            </Form.Field>
            <Form.Field type="select" name="select">
              <Form.Label>Options select:</Form.Label>
              <Form.Option value="1">uno</Form.Option>
              <Form.Option value="2">dos</Form.Option>
              <Form.Option value="3">tres </Form.Option>
              <Form.Help>ayuda select</Form.Help>
            </Form.Field>
            <Form.Field type="buttonGroup">
              <Button type="submit" color="primary">
                Ok
              </Button>
              <Button type="reset">Reset</Button>
            </Form.Field>
          </Form>
        </fieldset>
        <Tabs tabGroup="tabGroup">
          <Tabs.Tab tabId="tab1" label="Tab1" active>
            Tab1 contents
          </Tabs.Tab>
          <Tabs.Tab tabId="tab2" label="Tab2">
            Tab2 contents{' '}
          </Tabs.Tab>
          <Tabs.Tab tabId="tab3" label="Tab3">
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
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
