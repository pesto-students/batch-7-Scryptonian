import React from 'react';
import { Dialog, Classes, InputGroup, Button } from '@blueprintjs/core';
import axios from '../../axios';
import { BASE_URL } from '../../config';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { successToast, errorToast } from '../Toast/Toast';

class EditBoard extends React.Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: true,
    usePortal: true,
    boardName: ''
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });

    axios(`${BASE_URL}/boards/editname`, {
      method: 'patch',
      data: {
        boardname: this.state.boardName
      },
      params: { boardid: this.props.boardid }
    })
      .then(() => {
        successToast('Changed Board Name Successfully!');
        this.props.getAllBoards();
      })
      .catch(e => errorToast(e.message));
    this.props.onClose();
  };

  onNameChange = e => {
    this.setState({ boardName: e.target.value });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.onClose();
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
          <InputGroup
            large={true}
            placeholder="Enter Board Name"
            value={this.state.boardName}
            onChange={this.onNameChange}
          />
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
