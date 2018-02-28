import React, { Component, type ComponentType } from 'react';
import { Subscribe } from 'unstated';
import type { ContainerType, ContainersType } from 'unstated';

type States = ContainersType;
type MapProps = States => {};
type OrigProps = {};
type Init = (States, OrigProps) => any;
type RenrederProps = {
  init: Init,
  states: States,
  origProps: OrigProps,
  BaseComp: ComponentType<{}>,
  mapProps: MapProps,
};
class Renderer extends Component<RenrederProps> {
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

const connect = (
  to: ContainerType | ContainersType,
  mapProps: MapProps,
  init?: Init,
) => (BaseComp: ComponentType<any>): ComponentType<any> => (
  origProps: OrigProps,
) => (
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
