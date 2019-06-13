import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Button, Dialog, Classes, InputGroup, Label } from '@blueprintjs/core';

class CreateBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoFocus: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: true,
      enforceFocus: true,
      usePortal: true,
      lifecycles: [],
      boardName: '',
      errors: []
    };
  }

  handleClose = _ => {
    this.props.onClose();
  };

  saveBoard = async () => {
    let board = {
      name: this.state.boardName,
      lifecycles: this.state.lifecycles.map((ele, index) => {
        return { sequenceNumber: index, name: ele };
      })
    };
    let newAddedBoard;
    try {
      newAddedBoard = await axios.post(`${BASE_URL}/boards`, board);
      if (newAddedBoard) {
        this.props.updateBoard();
        this.props.onClose();
      }
    } catch (e) {
      console.log('Something went wrong');
    }
  };

  appendInput = event => {
    event.preventDefault();
    this.setState({ lifecycles: [...this.state.lifecycles, ''] });
  };

  handleInputChange = (event, index) => {
    this.state.lifecycles[index] = event.target.value;
  };

  removeLifecycle = index => {
    let templifecycle = [...this.state.lifecycles];
    templifecycle.splice(index, 1);
    this.setState({ lifecycles: [...templifecycle] });
  };

  setBoardName = event => {
    const boardNameVal = event.target.value;
    const regex = new RegExp('^[a-zA-Z0-9 _]*$');
    if (regex.test(boardNameVal) & (boardNameVal != '')) {
      this.state.errors['boardName'] = '';
    } else {
      this.state.errors['boardName'] = 'Enter a valid Board Name';
    }
    this.setState({ boardName: boardNameVal });
  };

  render() {
    const removeButton = index => {
      return (
        <Button
          icon={'cross'}
          minimal={true}
          onClick={() => this.removeLifecycle(index)}
        />
      );
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
              <span style={{ color: 'red' }}>
                {this.state.errors['boardName']}
              </span>
            </Label>
            <Label style={{ margin: '4px' }}>
              <span> Add Lifecycle:</span>
              {this.state.lifecycles.map((input, index) => (
                <div style={{ paddingBottom: '8px' }} key={index}>
                  <InputGroup
                    placeholder="Add Lifecycle"
                    fill={true}
                    value={input.value}
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
