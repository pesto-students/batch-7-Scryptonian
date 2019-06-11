import React from 'react';
import { shallow } from 'enzyme';
import Users from './Users';

describe(' <Users />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Users />);
  });

  it('should render a row div', () => {
    expect(wrapper.find('.row')).toHaveLength(1);
  });

  it('should render 2 column div', () => {
    expect(wrapper.find('.column')).toHaveLength(2);
  });
});
