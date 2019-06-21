import React from 'react';
import { Alert, Intent } from '@blueprintjs/core';

class DeleteBoard extends React.Component {
  state = {
    isOpen: true
  };

  handleMoveOpen = () => this.setState({ isOpen: true });
  handleMoveConfirm = () => {
    this.setState({ isOpen: false });
    // this.toaster.show({
    //   className: this.props.data.themeName,
    //   message: TOAST_MESSAGE
    // });
  };
  handleMoveCancel = () => this.setState({ isOpen: false });
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
