import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUp from './containers/SignUp/SignUp';
import { shallow } from 'enzyme';

describe('App component', () => {
  it('should render a SignUp Component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(SignUp)).toHaveLength(1);
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
