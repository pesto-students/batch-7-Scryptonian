import React from 'react';
import { shallow } from 'enzyme';
import MemberList from './MemberList';
import { Button } from '@blueprintjs/core';

describe(' <MemberList />', () => {
  it('should render a button', () => {
    const wrapper = shallow(<MemberList />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
