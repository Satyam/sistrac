import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import TableExample from './src/Table/_example';
import DataTableExample from './src/DataTable/_example';
import NavBarExample from './src/NavBar/_example';
import ButtonExample from './src/Button/_example';
import JumbotronExample from './src/Jumbotron/_example';
import FormsExample from './src/Form/_example';
import TabsExample from './src/Tabs/_example';
import GridsExample from './src/Grid/_example';

ReactDOM.render(
  <BrowserRouter>
    <div style={{ margin: '0 1em' }}>
      <FormsExample />
      {/*
          <NavBarExample />
          <JumbotronExample />
          <GridsExample />
          <DataTableExample />
        <TableExample />
        <ButtonExample />
        <TabsExample />
      */}
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
