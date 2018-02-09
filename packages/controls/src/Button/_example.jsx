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
  </div>
);
export default example;
