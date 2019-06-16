import React from 'react';
import LifecyclesContainer from '../LifecyclesContainer/LifecyclesContainer';
import Navbar from '../../components/Navbar/Navbar';
import KanbanTitleBar from '../../components/KanbanTitleBar/KanbanTitleBar';
import IssueDetails from '../../components/IssueDetailsModal/IssueDetails';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { connect } from 'react-redux';

export class KanbanLayout extends React.Component {
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
    const { isIssueDetailModalVisible } = this.props;
    return (
      <>
        <Navbar />
        <KanbanTitleBar name={this.state.boardName} />
        <LifecyclesContainer {...this.props} lifecycles={this.state.lifecycles} />
        {isIssueDetailModalVisible ? <IssueDetails /> : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isIssueDetailModalVisible: state.isIssueDetailModalVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanbanLayout);
