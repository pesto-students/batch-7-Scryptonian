import React from 'react';
import { shallow } from 'enzyme';
import { KanbanLayout } from './KanbanLayout';
import LifecyclesContainer from '../LifecyclesContainer/LifecyclesContainer';
import Navbar from '../../components/Navbar/Navbar';
import KanbanTitleBar from '../../components/KanbanTitleBar/KanbanTitleBar';

describe('<KanbanLayout />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<KanbanLayout getDataForKanbanView={() => {}} />);
  });

  it('should render <LifecyclesContainer />', () => {
    expect(wrapper.find(LifecyclesContainer)).toHaveLength(1);
  });

  it('should render <Navbar />', () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });

  it('should render <KanbanTitleBar />', () => {
    expect(wrapper.find(KanbanTitleBar)).toHaveLength(1);
  });
});
