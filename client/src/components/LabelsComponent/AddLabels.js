import React from 'react';
import './AddLabels.css';
import {
  Popover,
  Position,
  Classes,
  Button,
  Menu,
  InputGroup
} from '@blueprintjs/core';
import { TwitterPicker } from 'react-color';
import axios from '../../axios';
import { BASE_URL } from '../../config';
import { connect } from 'react-redux';
import { errorToast, successToast } from '../Toast/Toast';

class AddLabels extends React.Component {
  state = { color: '', name: '' };

  handleColorChange = e => {
    this.setState({ color: e.hex });
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = () => {
    axios(`${BASE_URL}/boards/label`, {
      method: 'post',
      data: {
        color: this.state.color,
        labelName: this.state.name,
        boardId: this.props.currentBoardId
      }
    })
      .then(() => successToast('New label created'))
      .catch(e => {
        errorToast(e.message);
      });
  };

  render() {
    return (
      <>
        <Popover
          content={
            <Menu className={Classes.ELEVATION_ONE}>
              <div className="add-name">
                <label>
                  Name:
                  <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </label>
              </div>
              <div className="add-color">
                <label>
                  Color:
                  <BlockPicker
                    color={this.state.color}
                    onChangeComplete={this.handleColorChange}
                  />
                </label>
              </div>
              <div className={Classes.POPOVER_DISMISS}>
                <button onClick={this.handleSubmit}>Add new Label</button>
              </div>
            </Menu>
          }
          position={Position.BOTTOM_LEFT}
        >
          <Button rightIcon="arrow-down" text="Add Labels" />
        </Popover>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentBoardId: state.currentBoardId
  };
};

export default connect(mapStateToProps)(AddLabels);
