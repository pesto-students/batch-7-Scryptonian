import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from './Navbar';

describe('<Navbar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });
  it('renders name of app', () => {
    expect(wrapper.find('h3').text()).toEqual('Issue Tracker');
  });
  it('should render type Nav', () => {
    expect(wrapper.type('.bp3-navbar-heading')).toEqual('nav');
  });
});

describe('<Navbar after user is authenticated/>', () => {
  let wrapper;
  let userName = 'Amit Badala';
  let userEmail = 'amitbadala07@gmail.com';
  let userImage =
    'https://s3-ap-south-1.amazonaws.com/cdn.odishatv.in/wp-content/uploads/2019/06/13123111/SRK.jpg';

  beforeEach(() => {
    wrapper = shallow(
      <Navbar
        isAuthenticated="true"
        displayName={userName}
        emailId={userEmail}
        profileImgUrl={userImage}
      />
    );
  });
  it('should render the user name on navbar', () => {
    expect(
      wrapper
        .find('span')
        .at(3)
        .text()
    ).toEqual(userName);
  });
  it('should render the user image', () => {
    expect(wrapper.find('img').prop('src')).toEqual(userImage);
  });
});
