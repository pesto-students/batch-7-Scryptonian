import React from 'react';
import { shallow } from 'enzyme';
import KanbanTitleBar from './KanbanTitleBar';
import { Navbar } from '@blueprintjs/core';
describe(' <KanbanTitleBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<KanbanTitleBar />);
  });
  it(' should render <Navbar> component', () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });

  it(' should render a <Navbar.heading>', () => {
    expect(wrapper.find(Navbar.Heading)).toHaveLength(1);
  });
});
