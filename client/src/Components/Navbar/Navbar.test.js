import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';

describe('<Navbar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });
  it('renders name of app', () => {
    expect(wrapper.find('h3').text()).toEqual('Issue Tracker');
  });
  it('should render type Nav', () => {
    expect(wrapper.type('.bp3-navbar-heading')).toEqual('nav');
  });
});
