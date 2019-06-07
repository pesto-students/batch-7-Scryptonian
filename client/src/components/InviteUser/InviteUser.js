import React from 'react';
import {
  Button,
  Dialog,
  Classes,
  InputGroup,
  Tooltip
} from '@blueprintjs/core';

class InviteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoFocus: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: true,
      enforceFocus: true,
      isOpen: false,
      usePortal: true,
      round: true
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleOpen}> Add User</Button>
        <Dialog
          icon="add"
          onClose={this.handleClose}
          title="Invite New User"
          {...this.state}
        >
          <div className={Classes.DIALOG_BODY}>
            <form>
              <Tooltip content="Enter email of the user to send invitation">
                <InputGroup
                  placeholder="Enter email"
                  large={true}
                  round={true}
                />
              </Tooltip>
            </form>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button intent="success" onClick={this.handleClose}>
                Send Invitation!
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default InviteUser;
