import React from 'react';
import { Button, Dialog, Classes, InputGroup } from '@blueprintjs/core';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { errorToast, successToast, warningToast } from '../Toast/Toast';

export class InviteUser extends React.Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: true,
    usePortal: true,
    round: true,
    mail: '',
    username: '',
  };

  handleNameOnChange = e => {
    this.setState({ username: e.target.value });
  };

  handleOnChange = e => {
    this.setState({ mail: e.target.value });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.toggleInviteUserModal();
  };

  sendInvite = () => {
    const recipientEmailid = this.state.mail;
    const recipientUserName = this.state.username;
    const { boardid, senderUserName } = this.props;
    if (recipientEmailid && recipientUserName) {
      const sendInviteURL = `${BASE_URL}/boards/invite`;
      axios(sendInviteURL, {
        method: 'post',
        params: { boardid },
        data: {
          recipientUserName,
          recipientEmailid,
          senderUserName,
        },
      })
        .then(res => {
          if (res.status === 201) {
            warningToast(res.data);
          }
          successToast(res.data);
          this.handleClose();
        })
        .catch(e => errorToast(e.message));
    }
  };

  render() {
    return (
      <div>
        <Dialog icon="add" onClose={this.handleClose} title="Invite New User" {...this.state}>
          <div className={Classes.DIALOG_BODY}>
            <form>
              <span>Name</span>
              <InputGroup
                placeholder="Enter name"
                large={true}
                round={true}
                value={this.state.username}
                onChange={this.handleNameOnChange}
              />
              <span>Email</span>
              <InputGroup
                placeholder="Enter email"
                large={true}
                round={true}
                value={this.state.mail}
                onChange={this.handleOnChange}
              />
            </form>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button intent="success" onClick={this.sendInvite}>
                Send Invitation!
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boardid: state.currentBoardId,
    senderUserName: state.displayName,
    userid: state.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleInviteUserModal: () => dispatch(actionCreators.toggleInviteUserModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InviteUser);
