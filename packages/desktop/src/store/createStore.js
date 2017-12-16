import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from './utils/promiseMiddleware';

import usuarios from './usuarios/reducer';
import estaciones from './estaciones/reducer';

const reducers = combineReducers({
  usuarios,
  estaciones,
});

export default (history, initialState) => {
  const middlewares = [reduxThunk, promiseMiddleware];
  const enhancers = [];

  if (process.env.NODE_ENV !== 'production') {
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
      /* eslint-disable-next-line no-underscore-dangle */
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }
  }
  enhancers.unshift(applyMiddleware(...middlewares));
  return createStore(reducers, initialState, compose(...enhancers));
};
