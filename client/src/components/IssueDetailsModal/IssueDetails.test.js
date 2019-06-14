import React from 'react';
import { shallow } from 'enzyme';
import IssueDetails from './IssueDetails';
import { Dialog } from '@blueprintjs/core';
import Upvote from '../Upvote/Upvote';
import DueDate from '../DueDate/DueDate';
import Comment from '../Comment/Comment';

describe(' <IssueDetails />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<IssueDetails />);
  });

  it('should render a Dialog component', () => {
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });

  it('should render a Upvote component', () => {
    expect(wrapper.find(Upvote)).toHaveLength(1);
  });

  it(' should render a DueDate component', () => {
    expect(wrapper.find(DueDate)).toHaveLength(1);
  });

  it('should render a comment component', () => {
    expect(wrapper.find(Comment)).toHaveLength(1);
  });
});
