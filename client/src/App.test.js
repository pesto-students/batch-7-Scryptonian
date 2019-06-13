import React from 'react';
import App from './App';
import SignUp from './containers/SignUp/SignUp';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { Board } from '../src/containers/BoardView/BoardView';

let pathMap = {};
describe('Testing for routes on App.js', () => {
  beforeAll(() => {
    const component = shallow(<App />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
  });
  it('should show Signup Component for / route', () => {
    expect(pathMap['/']).toBe(SignUp);
  });
  it('should show Board Component for /boards/ route', () => {
    expect(pathMap['/boards/']).toBe(Board);
  });
  it('should show Signup Component for /login/ route', () => {
    expect(pathMap['/login/']).toBe(SignUp);
  });
});
