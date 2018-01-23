import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../NavBar';

describe('NavBar', () => {
  it('plain render bar', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render bar with children', () => {
    const wrapper = shallow(<NavBar>something or other </NavBar>);
    expect(wrapper).toMatchSnapshot();
  });
  it('bar with children and brand', () => {
    const wrapper = shallow(<NavBar brand="pepe">something or other </NavBar>);
    expect(wrapper).toMatchSnapshot();
  });
  it('bar with children, brand and href', () => {
    const wrapper = shallow(
      <NavBar brand="pepe" href="/pepe">
        something or other{' '}
      </NavBar>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
