import React from 'react';
import { shallow } from 'enzyme';
import KanbanLayout from './KanbanLayout';
import LifecyclesContainer from '../LifecyclesContainer/LifecyclesContainer';

describe('<KanbanLayout />', () => {
  it('should render <LifecyclesContainer />', () => {
    const wrapper = shallow(<KanbanLayout />);
    expect(wrapper.find(LifecyclesContainer)).toHaveLength(1);
  });
});
