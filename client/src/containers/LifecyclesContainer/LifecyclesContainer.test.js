import React from 'react';
import { shallow } from 'enzyme';

import LifecyclesContainer from './LifecyclesContainer';
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
    wrapper.setProps({ lifecycles: ['Planning', 'Todo', 'InProgress', 'Completed'] });
    expect(wrapper.find(Lifecycle)).toHaveLength(4);
  });
});
