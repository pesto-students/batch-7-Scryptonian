import React from 'react';
import CreateBoardModal from './CreateBoardModal';
import { shallow } from 'enzyme';
import Lifecycle from './Lifecycle';

describe('<CreateBoardModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CreateBoardModal />);
  });
  it('should render a Lifecycle component', () => {
    expect(wrapper.find(Lifecycle)).toHaveLength(1);
  });

  it('should return the dialog div', () => {
    expect(wrapper.type()).toEqual('div');
  });
});
