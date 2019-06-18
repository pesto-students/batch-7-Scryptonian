import React from 'react';
import LifecyclesContainer from '../LifecyclesContainer/LifecyclesContainer';
import Navbar from '../../components/Navbar/Navbar';
import KanbanTitleBar from '../../components/KanbanTitleBar/KanbanTitleBar';
import IssueDetails from '../../components/IssueDetailsModal/IssueDetails';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

export class KanbanLayout extends React.Component {
  componentDidMount() {
    const { boardid, getDataForKanbanView, currentUserId } = this.props;
    getDataForKanbanView(boardid, currentUserId);
  }

  render() {
    const { isIssueDetailModalVisible } = this.props;
    return (
      <>
        <Navbar />
        <KanbanTitleBar name={this.props.boardName} />
        <LifecyclesContainer lifecycles={this.props.lifecycles} />
        {isIssueDetailModalVisible ? <IssueDetails /> : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isIssueDetailModalVisible: state.isIssueDetailModalVisible,
    boardName: state.currentBoardName,
    lifecycles: state.lifecycles,
    currentUserId: state.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataForKanbanView: (boardid, userid) =>
      dispatch(actionCreators.getDataForKanbanView(boardid, userid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanbanLayout);
