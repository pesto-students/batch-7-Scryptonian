import React from 'react';
import { shallow } from 'enzyme';
import Users from './Users';

describe(' <Users />', () => {
  let wrapper;
  beforeEach(() => {
    const memberList = [
      { member: '123', membername: 'RJ', _id: '1' },
      { member: '789', membername: 'DJ', _id: '2' },
    ];
    wrapper = shallow(<Users members={memberList} />);
  });

  it('should render a row div', () => {
    expect(wrapper.find('.row')).toHaveLength(1);
  });

  it('should render 2 column div', () => {
    expect(wrapper.find('.column')).toHaveLength(2);
  });
});
