import React from 'react';
import { shallow } from 'enzyme';

import DueDate from './DueDate';

const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

describe('<DueDate />', () => {
  it('should render correct date', () => {
    const dateString = '2019-06-07T23:45:33.293+00:00';
    const date = new Date(dateString).getDate().toString();
    const month = months[new Date(dateString).getMonth()]

    const wrapper = shallow(<DueDate />);
    wrapper.setProps({ date: dateString });
    expect(wrapper.find('.date').text()).toBe(date);
    expect(wrapper.find('.month').text()).toBe(month);
  });
});
