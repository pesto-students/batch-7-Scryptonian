import React from 'react';
import { shallow } from 'enzyme';

import { LifecyclesContainer } from './LifecyclesContainer';
import Lifecycle from './../../components/Lifecycle/Lifecycle';

describe('<LifecyclesContainer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LifecyclesContainer />);
  });

  it('should not render <Lifecycle /> if props has no "lifecycles" key', () => {
    expect(wrapper.find(Lifecycle)).toHaveLength(0);
  });

  it('should render a list of <Lifecycle /> if props has "lifecycles" key', () => {
    wrapper.setProps({
      lifecycles: [
        { _id: 1, name: 'Planning' },
        { _id: 2, name: 'Todo' },
        { _id: 3, name: 'InProgress' },
        { _id: 4, name: 'Completed' },
      ],
    });
    expect(wrapper.find(Lifecycle)).toHaveLength(4);
  });
});
