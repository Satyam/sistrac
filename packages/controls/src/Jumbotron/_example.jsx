import React from 'react';
import Jumbotron from './';

const example = () => (
  <div>
    <Jumbotron>
      <h1>Important info</h1> not so much
    </Jumbotron>
    <Jumbotron color="primary" background="danger">
      <h1>Important info</h1> not so much
    </Jumbotron>
  </div>
);

export default example;
