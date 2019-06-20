import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Button, Dialog, Classes, InputGroup, Label } from '@blueprintjs/core';
import { errorToast } from '../Toast/Toast';

class CreateBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      autoFocus: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: false,
      enforceFocus: true,
      usePortal: true,
      lifecycles: [''],
      boardName: '',
      errors: [],
    };
    this.state = this.initialState;
  }

  handleClose = _ => {
    this.setState(this.initialState);
    this.props.onClose();
  };

  saveBoard = async () => {
    let board = {
      name: this.state.boardName,
      lifecycles: this.state.lifecycles.map((ele, index) => {
        return { sequenceNumber: index, name: ele };
      }),
    };
    let newAddedBoard;
    try {
      newAddedBoard = await axios.post(`${BASE_URL}/boards`, board);
      if (newAddedBoard) {
        this.props.updateBoard();
        this.props.onClose();
      }
    } catch (e) {
      errorToast(e.message);
    }
  };

  appendInput = _ => {
    let lastElement = this.state.lifecycles.slice(-1)[0];
    if (lastElement !== '') {
      this.setState({ lifecycles: [...this.state.lifecycles, ''] });
    }
  };

  handleInputChange = (event, index) => {
    const changedLifecycles = [...this.state.lifecycles];
    changedLifecycles[index] = event.target.value;
    this.setState({ lifecycles: changedLifecycles });
  };

  removeLifecycle = index => {
    this.setState(prevState => ({
      lifecycles: prevState.lifecycles.filter((_, i) => i !== index),
    }));
  };

  setBoardName = event => {
    const boardNameVal = event.target.value;
    const regex = new RegExp('^[a-zA-Z0-9 _]*$');
    let boardError = [...this.state.errors];
    if (regex.test(boardNameVal) & (boardNameVal !== '')) {
      boardError['boardName'] = '';
    } else {
      boardError['boardName'] = 'Enter a valid Board Name';
    }
    this.setState({ boardName: boardNameVal, errors: boardError });
  };

  render() {
    const removeButton = index => {
      return <Button icon={'cross'} minimal={true} onClick={() => this.removeLifecycle(index)} />;
    };

    return (
      <div className="inputs">
        <Dialog
          onClose={this.handleClose}
          title="Create New Board"
          isOpen={this.props.isOpen}
          {...this.state}
        >
          <div className={Classes.DIALOG_BODY} id="inputs">
            <Label>
              Enter Board Name:
              <InputGroup
                placeholder="Enter Board Name"
                value={this.state.boardName}
                onChange={this.setBoardName}
              />
              <span style={{ color: 'red' }}>{this.state.errors['boardName']}</span>
            </Label>
            <Label style={{ margin: '4px' }}>
              <span> Add Lifecycle:</span>
              {this.state.lifecycles.map((input, index) => (
                <div style={{ paddingBottom: '8px' }} key={index}>
                  <InputGroup
                    placeholder="Add Lifecycle"
                    fill={true}
                    value={input}
                    onChange={event => this.handleInputChange(event, index)}
                    rightElement={removeButton(index)}
                  />
                </div>
              ))}

              <Button
                onClick={this.appendInput}
                icon="add"
                minimal={true}
                large={true}
                fill={true}
                intent="primary"
              />
            </Label>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <Button onClick={this.saveBoard} intent="success">
              Create Board
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default CreateBoardModal;
