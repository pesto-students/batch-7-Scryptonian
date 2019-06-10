import React from 'react';
import { shallow } from 'enzyme';

import Comment from './Comment';
import CommentIcon from '../../assets/CommentIcon';

describe('<Comment />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Comment />);
  });

  function testSubComponent(condensed = false) {
    expect(wrapper.find('.comment')).toHaveLength(1);
    expect(wrapper.find(CommentIcon)).toHaveLength(1);
    expect(wrapper.find('.commentCount')).toHaveLength(1);
    if (condensed) {
      expect(wrapper.contains('Comments')).toEqual(false);
    } else {
      expect(wrapper.contains('Comments')).toEqual(true);
    }
  }

  it('should render 0 comments by default', () => {
    testSubComponent();
    expect(wrapper.find('.commentCount').text()).toBe('0');
  });

  it('should render comment count from props', () => {
    wrapper.setProps({ commentCount: 100 });
    testSubComponent();
    expect(wrapper.find('.commentCount').text()).toBe('100');
  });

  it('should render condensed form of comments component', () => {
    wrapper.setProps({ condensed: true });
    testSubComponent(true);
  });
});
