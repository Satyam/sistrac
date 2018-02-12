import React from 'react';
import { Grid, Row, Col } from './';

const example = () => (
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
    <h3>HideBelow</h3>
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
    <h3>HideAbove</h3>
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
    <h3>vAlign by row</h3>
    <Row className="show-grid" style={{ height: '5em' }} vAlign="top">
      <Col xs={12}>vAlign=top</Col>
    </Row>
    <Row className="show-grid" style={{ height: '5em' }} vAlign="middle">
      <Col xs={12}>vAlign=middle</Col>
    </Row>
    <Row className="show-grid" style={{ height: '5em' }} vAlign="bottom">
      <Col xs={12}>vAlign=bottom</Col>
    </Row>
    <h3>vAlign by col</h3>
    <Row className="show-grid" style={{ height: '5em' }}>
      <Col xs={4} vAlign="top">
        top
      </Col>
      <Col xs={4} vAlign="middle">
        middle
      </Col>
      <Col xs={4} vAlign="bottom">
        bottom
      </Col>
    </Row>
    <h3>Justify</h3>
    <Row className="show-grid" justify="left">
      <Col xs={4}>left</Col>
      <Col xs={4}>left</Col>
    </Row>
    <Row className="show-grid" justify="center">
      <Col xs={4}>center</Col>
      <Col xs={4}>center</Col>
    </Row>
    <Row className="show-grid" justify="right">
      <Col xs={4}>right</Col>
      <Col xs={4}>right</Col>
    </Row>
    <Row className="show-grid" justify="even">
      <Col xs={4}>even</Col>
      <Col xs={4}>even</Col>
    </Row>
    <Row className="show-grid" justify="edges">
      <Col xs={4}>edges</Col>
      <Col xs={4}>edges</Col>
    </Row>
  </Grid>
);

export default example;
