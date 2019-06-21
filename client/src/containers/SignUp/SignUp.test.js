import React from 'react';
import { shallow } from 'enzyme';

import SignUp from './SignUp';
import GoogleSignInButton from './../../components/GoogleSignIn/GoogleSignIn';

describe('<SignUp />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  it('should render a "Sign in using Google" button if not authenticated', () => {
    expect(wrapper.find(GoogleSignInButton)).toHaveLength(1);
  });

  it('should render a "Sign in using Google" button if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(GoogleSignInButton)).toHaveLength(0);
  });
});
