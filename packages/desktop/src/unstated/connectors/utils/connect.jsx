import React, { Component } from 'react';
import { Subscribe } from 'unstated';

class Renderer extends Component {
  shouldRender = true;
  mounted = false;
  shouldComponentUpdate() {
    return this.shouldRender;
  }
  componentDidMount() {
    const { init, states, origProps } = this.props;
    this.mounted = true;
    if (init) {
      const p = init(...states, origProps);
      if (p && typeof p.then === 'function') {
        this.shouldRender = false;
        p.then(() => {
          this.shouldRender = true;
          if (this.mounted) this.forceUpdate();
        });
      }
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    const { BaseComp, origProps, mapProps, states } = this.props;
    const props = mapProps(...states, origProps);
    return <BaseComp {...origProps} {...props} />;
  }
}

const SimpleRenderer = ({ BaseComp, origProps, mapProps, states }) => (
  <BaseComp {...origProps} {...mapProps(...states, origProps)} />
);

function connect(to, mapProps, init) {
  return BaseComp => origProps => (
    <Subscribe to={Array.isArray(to) ? to : [to]}>
      {(...states) => {
        const props = {
          init,
          mapProps,
          BaseComp,
          origProps,
          states,
        };
        return init ? <Renderer {...props} /> : <SimpleRenderer {...props} />;
      }}
    </Subscribe>
  );
}
export default connect;
