// @flow
import React, { Component, type ComponentType } from 'react';
import { Subscribe } from 'unstated';
import type { ContainerType, ContainersType } from 'unstated';

type OrigProps = Object;

export type MapProps<Container: ContainerType> = (Container, OrigProps) => {};
export type Init<Container: ContainerType> = (Container, OrigProps) => any;

type RendererProps = {
  init?: Init,
  states: ContainersType,
  origProps: OrigProps,
  BaseComp: ComponentType<{}>,
  mapProps: MapProps,
};

class Renderer extends Component<RendererProps> {
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

const connect = (
  to: Class<ContainerType> | Array<Class<ContainerType>>,
  mapProps: MapProps,
  init?: Init,
) => (BaseComp: ComponentType<any>): ComponentType<any> => (
  origProps: OrigProps,
) => (
  <Subscribe to={Array.isArray(to) ? to : [to]}>
    {(...states) => {
      const props: RendererProps = {
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

export default connect;
