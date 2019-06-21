import React from 'react';
import { Dialog, Classes, InputGroup, Button } from '@blueprintjs/core';

class EditBoard extends React.Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: true,
    usePortal: true
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };
  render() {
    return (
      <Dialog
        id="unique"
        title="Edit Board Name"
        icon="edit"
        isOpen={this.state.isOpen}
        onClose={this.handleClose}
      >
        <div className={Classes.DIALOG_BODY}>
          <InputGroup large={true} placeholder="Enter Board Name" />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <Button intent="primary" onClick={this.handleClick}>
            Change Board Name!
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default EditBoard;
