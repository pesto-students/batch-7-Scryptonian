import React from 'react';
import { shallow } from 'enzyme';

import { Card } from '@blueprintjs/core';
import { Issue } from './Issue';
import Label from '../Label/Label';
import Upvote from '../Upvote/Upvote';
import Comment from '../Comment/Comment';
import DueDate from '../DueDate/DueDate';
import Assignee from '../Assignee/Assignee';

describe('<Issue />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Issue upvotedBy={[]} />);
  });

  it('should have a <Card /> component', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it('should render issue text', () => {
    const issue = 'Write test cases';
    wrapper.setProps({ issue: issue });
    expect(wrapper.find('p').text()).toBe(issue);
  });

  it('should render all <Label /> passed as props', () => {
    const labels = [
      { name: 'Easy Peasy', color: 'green' },
      { name: 'Very Hard' },
      { name: 'Do Not Touch', color: 'red' },
    ];
    wrapper.setProps({ labels });
    expect(wrapper.find(Label)).toHaveLength(3);
  });

  it('should not render any <Label /> component if no label is passed as props', () => {
    expect(wrapper.find(Label)).toHaveLength(0);
  });

  it('should render <DueDate /> component', () => {
    wrapper.setProps({ dueDate: new Date() });
    expect(wrapper.find(DueDate)).toHaveLength(1);
  });

  it('should not render <DueDate /> component if no date is passed', () => {
    expect(wrapper.find(DueDate)).toHaveLength(0);
  });

  it('should render <Assignee /> component if assignee is passed', () => {
    wrapper.setProps({ assignee: 'AS' });
    expect(wrapper.find(Assignee)).toHaveLength(1);
  });

  it('should not render <Assignee /> component if not passed', () => {
    expect(wrapper.find(Assignee)).toHaveLength(0);
  });

  it('should render <Upvote /> component', () => {
    expect(wrapper.find(Upvote)).toHaveLength(1);
    expect(wrapper.find(Upvote).props().condensed).toBe(true);
  });

  it('should render <Comment /> component', () => {
    expect(wrapper.find(Comment)).toHaveLength(1);
    expect(wrapper.find(Comment).props().condensed).toBe(true);
  });
});
