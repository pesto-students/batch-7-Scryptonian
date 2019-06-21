import React from 'react';
import { Alert, Intent } from '@blueprintjs/core';
import axios from '../../axios';
import { BASE_URL } from '../../config';
import { successToast, errorToast } from '../Toast/Toast';

class DeleteBoard extends React.Component {
  state = {
    isOpen: true
  };

  handleMoveOpen = () => this.setState({ isOpen: true });
  handleMoveConfirm = () => {
    this.setState({ isOpen: false });
    axios(`${BASE_URL}/boards/`, {
      method: 'delete',
      params: { boardid: this.props.boardid }
    })
      .then(() => {
        successToast('Board Deleted Successfully!');
        this.props.getAllBoards();
      })
      .catch(e => errorToast(e.message));
    this.props.onClose();
  };
  handleMoveCancel = () => {
    this.setState({ isOpen: false });
    this.props.onClose();
  };
  render() {
    return (
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        icon="trash"
        intent={Intent.DANGER}
        isOpen={this.state.isOpen}
        onCancel={this.handleMoveCancel}
        onConfirm={this.handleMoveConfirm}
      >
        <p>Are you sure you want to Delete this board ?</p>
      </Alert>
    );
  }
}

export default DeleteBoard;
