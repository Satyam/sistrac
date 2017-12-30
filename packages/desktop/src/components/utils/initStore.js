import React, { Component } from 'react';
import PropTypes from 'prop-types';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';

const initStore = initializer => BaseComponent => {
  const init = Array.isArray(initializer) ? initializer[0] : initializer;

  const StoreInitializer = class extends Component {
    static getStoreInitializer() {
      return initializer;
    }

    constructor(props, context) {
      super(props, context);
      this.store = context.store;
    }
    componentDidMount() {
      const { dispatch, getState } = this.store;
      init(dispatch, getState, this.props);
    }
    componentDidUpdate() {
      const { dispatch, getState } = this.store;
      init(dispatch, getState, this.props);
    }

    render() {
      return React.createElement(BaseComponent, this.props);
    }
  };
  StoreInitializer.contextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }),
  };
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'initStore'))(
      StoreInitializer,
    );
  }
  return StoreInitializer;
};

export default initStore;
