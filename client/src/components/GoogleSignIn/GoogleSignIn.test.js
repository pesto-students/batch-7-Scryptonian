import React from 'react';
import GoogleSignInButton from './../../assets/google-button/btn_google_signin.png';
import { shallow } from 'enzyme';

import GoogleSignIn from './GoogleSignIn';

describe('<GoogleSignIn />', () => {
  it('should render an image as a button', () => {
    const wrapper = shallow(<GoogleSignIn />);
    const img = wrapper.find('img');
    expect(img).toHaveLength(1);
    expect(img.props().src).toEqual(GoogleSignInButton);
    expect(img.props().role).toEqual('button');
  });
});
