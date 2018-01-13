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
      this.state = { render: false, chained: false };
    }
    isInitialized = prevProps => {
      const { dispatch, getState } = this.store;
      const { render, chained } = this.state;
      if (render || chained) return;

      const initialized = init(dispatch, getState, this.props, prevProps);

      if (typeof initialized === 'object' && initialized.then) {
        initialized.then(resp => {
          if (this.mounted) this.setState({ render: true });
        });
        this.setState({ chained: true });
      } else if (initialized !== false) {
        this.setState({ render: true, chained: true });
      }
    };
    componentDidMount() {
      this.mounted = true;
      this.isInitialized({});
    }
    componentDidUpdate(prevProps) {
      this.isInitialized(prevProps);
    }
    componentWillUnmount() {
      this.mounted = false;
    }
    render() {
      return this.state.render ? <BaseComponent {...this.props} /> : null;
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
