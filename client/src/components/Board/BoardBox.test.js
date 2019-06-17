import React from 'react';
import { shallow } from 'enzyme';
import BoardBox from './BoardBox';
import { Card } from '@blueprintjs/core';

describe('<BoardBox />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BoardBox />);
  });
  it('Should have a Card element', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it('Should have a <p> element', () => {
    expect(wrapper.find('p')).toHaveLength(2);
  });
});
