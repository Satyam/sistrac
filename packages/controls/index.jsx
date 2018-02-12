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

import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
const store = createStore(
  combineReducers({
    form: formReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div style={{ margin: '0 1em' }}>
        <NavBarExample />
        {/*
          <JumbotronExample />
          <GridsExample />
          <DataTableExample />
        <TableExample />
        <ButtonExample />
        <FormsExample />
        <TabsExample />
      */}
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
