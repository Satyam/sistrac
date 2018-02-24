import React, { Component } from 'react';
import { Subscribe } from 'unstated';

class Renderer extends Component {
  componentDidMount() {
    const { init, states, origProps } = this.props;
    if (init) {
      init(...states, origProps);
    }
  }
  render() {
    const { BaseComp, origProps, mapProps, states } = this.props;
    const props = mapProps(...states, origProps);
    return <BaseComp {...origProps} {...props} />;
  }
}
const connect = (to, mapProps, init) => BaseComp => origProps => (
  <Subscribe to={Array.isArray(to) ? to : [to]}>
    {(...states) => {
      const props = {
        init,
        mapProps,
        BaseComp,
        origProps,
        states,
      };
      return <Renderer {...props} />;
    }}
  </Subscribe>
);

export default connect;
