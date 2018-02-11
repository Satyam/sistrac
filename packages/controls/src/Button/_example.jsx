import React from 'react';
import { Button, ButtonGroup } from './';

const example = () => (
  <div>
    {' '}
    <Button>nada</Button>
    <Button color="secondary">secondary</Button>
    <Button color="secondary" active>
      secondary active
    </Button>
    <Button
      color="primary"
      outline
      toggle
      name="toggly"
      onToggle={(active, name) => console.log(active, name)}
    >
      primary toggle outline
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
      <Button name="tres" color="danger">
        tres
      </Button>
    </ButtonGroup>
  </div>
);
export default example;
