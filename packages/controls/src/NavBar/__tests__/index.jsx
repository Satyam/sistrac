import React from 'react';
import { mount } from 'enzyme';
import NavBar from '../';

describe('NavBar with Brand', () => {
  it('should render within one another', () => {
    const wrapper = mount(<NavBar brand="Titulo" />);
    expect(wrapper).toMatchSnapshot();
  });
});
