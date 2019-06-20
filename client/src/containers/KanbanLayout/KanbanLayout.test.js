import React from 'react';
import { shallow } from 'enzyme';
import { KanbanLayout } from './KanbanLayout';
import LifecyclesContainer from '../LifecyclesContainer/LifecyclesContainer';
import Navbar from '../../components/Navbar/Navbar';
import KanbanTitleBar from '../../components/KanbanTitleBar/KanbanTitleBar';

describe('<KanbanLayout />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <KanbanLayout
        match={{ params: { boardId: '5cfaf71d26607358e66c1d49' } }}
        getDataForKanbanView={() => {}}
      />
    );
  });

  it('should render <LifecyclesContainer />', () => {
    expect(wrapper.find(LifecyclesContainer)).toHaveLength(1);
  });
});
