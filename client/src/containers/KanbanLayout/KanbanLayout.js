import React from 'react';
import LifecyclesContainer from '../LifecyclesContainer/LifecyclesContainer';
import Navbar from '../../components/Navbar/Navbar';
import KanbanTitleBar from '../../components/KanbanTitleBar/KanbanTitleBar';
import axios from 'axios';
import { BASE_URL } from '../../config';

class KanbanLayout extends React.Component {
  state = {
    lifecycles: null,
    boardName: null,
  };
  componentDidMount() {
    const { boardid } = this.props;
    axios
      .get(`${BASE_URL}/boards/kanban`, {
        params: { boardid },
      })
      .then(res => {
        this.setState({ lifecycles: res.data.lifecycles, boardName: res.data.name });
      })
      .catch(e => {});
  }
  render() {
    return (
      <>
        <Navbar />
        <KanbanTitleBar name={this.state.boardName} />
        <LifecyclesContainer {...this.props} lifecycles={this.state.lifecycles} />
      </>
    );
  }
}

export default KanbanLayout;
