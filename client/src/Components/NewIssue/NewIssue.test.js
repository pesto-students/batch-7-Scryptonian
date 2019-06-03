import React from 'react';
import { shallow } from 'enzyme';
import NewIssue from './NewIssue';
import { Card, Button, EditableText } from '@blueprintjs/core';

describe('<NewIssue />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewIssue />);
  });

  it('should render a <Card /> component', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it('should render a <Button /> component to Add issue', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().text).toBe('Add issue');
  });

  it('should render an <EditableText /> component with correct props', () => {
    expect(wrapper.find(EditableText)).toHaveLength(1);
    expect(wrapper.find(EditableText).props().confirmOnEnter).toBe(false);
    expect(wrapper.find(EditableText).props().placeholder).toBe('New Issue...');
    expect(wrapper.find(EditableText).props().multiline).toBe(true);
    expect(wrapper.find(EditableText).props().minLines).toBe(2);
  });
});
