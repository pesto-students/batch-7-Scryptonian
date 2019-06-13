import React from 'react';
import { shallow } from 'enzyme';

import Lifecycle from './Lifecycle';
import Issue from '../Issue/Issue';
import NewIssue from '../NewIssue/NewIssue';

describe('<Lifecycle />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Lifecycle />);
  });

  it('should render lifecycle heading', () => {
    expect(wrapper.find('h3')).toHaveLength(1);
  });

  it('should render a list of issues if some issues are present', () => {
    const issues = [
      {
        _id: 123,
        issue: 'An issue',
        tags: [],
        upvotes: 5,
      },
      {
        _id: 124,
        issue: 'Another issue',
      },
    ];

    wrapper.setProps({ issues });
    expect(wrapper.find(Issue)).toHaveLength(2);
  });

  it('should not render any issue if no issues are present', () => {
    expect(wrapper.find(Issue)).toHaveLength(0);
  });

  it('should render a "New Issue" card', () => {
    expect(wrapper.find(NewIssue)).toHaveLength(1);
  });
});
