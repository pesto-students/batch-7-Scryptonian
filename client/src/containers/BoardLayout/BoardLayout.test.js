import React from 'react';
import { shallow } from 'enzyme';
import { BoardLayout } from './BoardLayout';
import CreateBoardModal from '../../components/CreateBoardModal/CreateBoardModal';
import Box from '../../components/Board/BoardBox';

describe('<BoardLayout />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BoardLayout unsetBoardName={() => {}} />);
  });

  it('should render <CreateBoardModal />', () => {
    expect(wrapper.find(CreateBoardModal)).toHaveLength(1);
  });

  it('should render <Box />', () => {
    expect(wrapper.find(Box)).toHaveLength(1);
  });
});
