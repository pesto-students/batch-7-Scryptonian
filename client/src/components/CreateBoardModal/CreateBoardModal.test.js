import React from 'react';
import CreateBoardModal from './CreateBoardModal';
import { shallow } from 'enzyme';
import Lifecycle from './Lifecycle';
import { Button, Dialog, Classes, InputGroup, Label } from '@blueprintjs/core';

describe('<CreateBoardModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CreateBoardModal />);
  });
  it('should render a Dailog component', () => {
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });

  it('should render a 2 Label component 1.Enter Board Name 2.Add Lifecycles', () => {
    expect(wrapper.find(Label)).toHaveLength(2);
  });

  it('should return the dialog div', () => {
    expect(wrapper.type()).toEqual('div');
  });
});
