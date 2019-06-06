import React from 'react';
import { shallow } from 'enzyme';

import Label, { DEFAULT_COLOR } from './Label';
import { Tag } from '@blueprintjs/core';

describe('<Label />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Label />);
  });

  it('should render Tag component', () => {
    expect(wrapper.find(Tag)).toHaveLength(1);
  });

  it('should render <Label /> with the text provided in props', () => {
    wrapper.setProps({ label: 'Bugfix' });
    expect(wrapper.children().text()).toEqual('Bugfix');
  });

  it('should render Tag component with a default background color', () => {
    expect(wrapper.find(Tag).get(0).props.style.backgroundColor).toEqual(DEFAULT_COLOR);
  });

  it('should render Tag component with color from props', () => {
    wrapper.setProps({ color: 'blue' });
    expect(wrapper.find(Tag).get(0).props.style.backgroundColor).toEqual('blue');
  });

  it('should render Tag component with certain margin', () => {
    const margin = wrapper.find(Tag).get(0).props.style.margin;
    expect(typeof margin).toBe('string');
  });
});
