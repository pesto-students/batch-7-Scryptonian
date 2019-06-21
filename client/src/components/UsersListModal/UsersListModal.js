import React from 'react';
import { Dialog, Button, Classes } from '@blueprintjs/core';
import Users from './Users';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

class UsersListModal extends React.Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: true,
    usePortal: true
  };

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.toggleMemberListModal();
  };

  render() {
    return (
      <div>
        <Dialog
          icon="user"
          onClose={this.handleClose}
          title="User List"
          {...this.state}
        >
          <div className={Classes.DIALOG_BODY}>
            <Users members={this.props.members} />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <Button
              onClick={() => {
                this.handleClose();
                this.props.toggleInviteUserModal();
              }}
              intent="success"
            >
              Invite New User
            </Button>
            <Button onClick={this.handleClose} style={{ float: 'right' }}>
              Close
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isIssueDetailModalVisible: state.isIssueDetailModalVisible,
    boardName: state.currentBoardName,
    lifecycles: state.lifecycles,
    isMemberListModalVisible: state.isMemberListModalVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleInviteUserModal: () =>
      dispatch(actionCreators.toggleInviteUserModal()),
    toggleMemberListModal: () =>
      dispatch(actionCreators.toggleMemberListModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListModal);
