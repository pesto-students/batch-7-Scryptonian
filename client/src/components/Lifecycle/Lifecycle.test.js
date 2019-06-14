import React from 'react';
import { shallow } from 'enzyme';

import Lifecycle from './Lifecycle';

describe('<Lifecycle />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Lifecycle />);
  });

  it('should render lifecycle heading', () => {
    expect(wrapper.find('h3')).toHaveLength(1);
  });
});
