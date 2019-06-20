import React from 'react';
import LifecyclesContainer from '../LifecyclesContainer/LifecyclesContainer';
import IssueDetails from '../../components/IssueDetailsModal/IssueDetails';
import UsersListModal from '../../components/UsersListModal/UsersListModal';
import InviteUser from '../../components/InviteUser/InviteUser';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import Cookies from 'js-cookie';

export class KanbanLayout extends React.Component {
  componentDidMount() {
    const boardId = this.props.match.params.boardId;
    const userDetails = Cookies.getJSON('user-info');
    if (userDetails) {
      const { updateAuthDetails } = this.props;
      updateAuthDetails(userDetails);
    }
    if (boardId) {
      const { getDataForKanbanView, currentUserId } = this.props;
      getDataForKanbanView(boardId, currentUserId);
    }
  }

  render() {
    const {
      isIssueDetailModalVisible,
      isMemberListModalVisible,
      boardMemberList,
      isInviteUserModalVisible
    } = this.props;
    return (
      <>
        <LifecyclesContainer lifecycles={this.props.lifecycles} />
        {isIssueDetailModalVisible ? <IssueDetails /> : null}
        {isMemberListModalVisible ? (
          <UsersListModal members={boardMemberList} />
        ) : null}
        {isInviteUserModalVisible ? <InviteUser /> : null}
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
    isInviteUserModalVisible: state.isInviteUserModalVisible,
    boardMemberList: state.boardMemberList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataForKanbanView: (boardid, userid) =>
      dispatch(actionCreators.getDataForKanbanView(boardid, userid)),
    updateAuthDetails: userData =>
      dispatch(actionCreators.updateAuthDetails(userData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanLayout);
