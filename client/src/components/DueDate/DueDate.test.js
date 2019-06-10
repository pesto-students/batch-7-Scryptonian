import React from 'react';
import { shallow } from 'enzyme';

import DueDate from './DueDate';

describe('<DueDate />', () => {
  it('should render correct date', () => {
    const dateString = '2019-06-07T23:45:33.293+05:30';

    const wrapper = shallow(<DueDate />);
    wrapper.setProps({ date: dateString });
    expect(wrapper.find('.date').text()).toBe("7");
    expect(wrapper.find('.month').text()).toBe("JUN");
  });
});
