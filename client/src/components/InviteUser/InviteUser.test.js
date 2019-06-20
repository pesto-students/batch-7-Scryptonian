import React from 'react';
import { shallow } from 'enzyme';
import { InviteUser } from './InviteUser';
import { Dialog, Button } from '@blueprintjs/core';

describe(' <Inviteuser />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<InviteUser />);
  });

  it('should contain one Dialog component', () => {
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });

  it('should have 1 Button components', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
