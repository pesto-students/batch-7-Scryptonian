import React from 'react';
import Lifecycle from './Lifecycle';
import { Button, Dialog, Classes, InputGroup, Label } from '@blueprintjs/core';

class CreateBoardModal extends React.Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: false,
    usePortal: true
  };

   handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div className="inputs">
        <Button onClick={this.handleOpen}>Add New Board</Button>
        <Dialog
          onClose={this.handleClose}
          title="Create New Board"
          {...this.state}
        >
          <div className={Classes.DIALOG_BODY} id="inputs">
            <Label>
              Enter Board Name:
              <InputGroup placeholder="Enter Board Name" round={true} />
            </Label>
            <Lifecycle />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <Button onClick={this.handleClose} intent="success">
              Create Board
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default CreateBoardModal;
