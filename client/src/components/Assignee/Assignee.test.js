import React from 'react';
import { shallow } from 'enzyme';

import Assignee from './Assignee';

describe('<Assignee />', () => {
  it('should render correct name', () => {
    const wrapper = shallow(<Assignee />);
    wrapper.setProps({ name: 'John' });
    expect(wrapper.props().children).toBe('John');
  });
});
