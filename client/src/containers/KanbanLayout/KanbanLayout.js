import React from 'react';
import LifecyclesContainer from '../LifecyclesContainer/LifecyclesContainer';
import IssueDetails from '../../components/IssueDetailsModal/IssueDetails';
import UsersListModal from '../../components/UsersListModal/UsersListModal';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

export class KanbanLayout extends React.Component {
  componentDidMount() {
    const boardId = this.props.match.params.boardId;
    if (boardId) {
      const { getDataForKanbanView, currentUserId } = this.props;
      getDataForKanbanView(boardId, currentUserId);
    }
  }

  render() {
    const {
      isIssueDetailModalVisible,
      isMemberListModalVisible,
      boardMemberList
    } = this.props;
    return (
      <>
        <LifecyclesContainer lifecycles={this.props.lifecycles} />
        {isIssueDetailModalVisible ? <IssueDetails /> : null}
        {isMemberListModalVisible ? (
          <UsersListModal members={boardMemberList} />
        ) : null}
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
    isMemberListModalVisible: state.isMemberListModalVisible,
    boardMemberList: state.boardMemberList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataForKanbanView: (boardid, userid) =>
      dispatch(actionCreators.getDataForKanbanView(boardid, userid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanLayout);
