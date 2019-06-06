import React from 'react';
import { shallow } from 'enzyme';

import Upvote from './Upvote';

describe('<Upvote />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Upvote />);
  });

  function testUpvoteState(upvoted = false) {
    if (upvoted) {
      expect(wrapper.find('.upvoted')).toHaveLength(1);
      expect(wrapper.find('.didNotUpvote')).toHaveLength(0);
    } else {
      expect(wrapper.find('.upvoted')).toHaveLength(0);
      expect(wrapper.find('.didNotUpvote')).toHaveLength(1);
    }
  }

  function testCondensedState(condensed = false) {
    if (condensed) {
      expect(wrapper.contains('Upvote')).toEqual(false);
      expect(wrapper.find('.divider')).toHaveLength(0);
      expect(wrapper.children()).toHaveLength(2);
    } else {
      expect(wrapper.contains('Upvote')).toEqual(true);
      expect(wrapper.find('.divider')).toHaveLength(1);
      expect(wrapper.children()).toHaveLength(4);
    }
  }

  it('should render 0 upvotes by default', () => {
    expect(wrapper.find('.upvoteCount')).toHaveLength(1);
    expect(wrapper.find('.upvoteCount').text()).toEqual('0');
  });

  it('should render upvotes based on props', () => {
    wrapper.setProps({ upvotes: 105 });
    expect(wrapper.find('.upvoteCount')).toHaveLength(1);
    expect(wrapper.find('.upvoteCount').text()).toEqual('105');
  });

  it('should render <Upvote /> in did-not-upvote state', () => {
    testUpvoteState(false);
    testCondensedState(false);
    expect(wrapper.find('.upvoteCount')).toHaveLength(1);
  });

  it('should render <Upvote /> in upvoted state', () => {
    wrapper.setProps({ upvoted: true });
    testUpvoteState(true);
    testCondensedState(false);
    expect(wrapper.find('.upvoteCount')).toHaveLength(1);
  });

  it('should render condensed form of <Upvote /> in did-not-upvote state', () => {
    wrapper.setProps({ condensed: true });
    testUpvoteState(false);
    testCondensedState(true);
  });

  it('should render condensed form of <Upvote /> in voted state', () => {
    wrapper.setProps({ condensed: true, upvoted: true });
    testUpvoteState(true);
    testCondensedState(true);
  });
});
