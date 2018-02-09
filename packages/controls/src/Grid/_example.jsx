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
);

export default example;
