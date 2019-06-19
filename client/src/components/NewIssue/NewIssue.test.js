import React from 'react';
import { shallow } from 'enzyme';
import { NewIssue } from './NewIssue';
import { Card, Button, InputGroup } from '@blueprintjs/core';

describe('<NewIssue />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewIssue />);
  });

  it('should render a <Card /> component', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it('should render an <InputGroup /> component with correct props', () => {
    expect(wrapper.find(InputGroup)).toHaveLength(1);
    expect(wrapper.find(InputGroup).props().placeholder).toBe('New Issue...');
    expect(wrapper.find(InputGroup).props().fill).toBe(true);
  });
});
