import React from 'react';
import { Dialog, Button, Classes } from '@blueprintjs/core';
import Users from './Users';

class UsersListModal extends React.Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: false,
    usePortal: true
  };
  handleToggle = () => this.setState({ isOpen: !this.state.isOpen });
  render() {
    return (
      <div>
        <Button onClick={this.handleToggle}>Show Dialog</Button>
        <Dialog
          icon="user"
          onClose={this.handleToggle}
          title="User List"
          {...this.state}
        >
          <div className={Classes.DIALOG_BODY}>
            <Users />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <Button onClick={this.handleToggle}>Invite New User</Button>
            <Button onClick={this.handleToggle}>Close</Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default UsersListModal;
