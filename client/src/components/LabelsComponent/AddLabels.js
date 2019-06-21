import React from 'react';
import './AddLabels.css';
import {
  Popover,
  Position,
  Classes,
  Button,
  Menu,
  InputGroup,
  Intent
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
      <Popover
        content={
          <Menu className={Classes.ELEVATION_ONE} style={{ display: 'block' }}>
            <div className="add-name">
              <label>
                Name:
                <InputGroup
                  type="text"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  style={{marginTop: '10px'}}
                />
              </label>
            </div>
            <div className="add-color">
              <label>
                Color:
                <div style={{ margin: '14px' }}>
                  <TwitterPicker
                    color={this.state.color}
                    onChangeComplete={this.handleColorChange}
                  />
                </div>
              </label>
            </div>
            <div className={Classes.POPOVER_DISMISS}>
              <Button
                small={false}
                intent={Intent.SUCCESS}
                text="Add New Label"
                onClick={this.handleSubmit}
                style={{margin: '15px'}}
              />
            </div>
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
      >
        <Button
          icon="add-to-artifact"
          small={true}
          intent={Intent.NONE}
          text="Add Labels"
        />
      </Popover>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentBoardId: state.currentBoardId
  };
};

export default connect(mapStateToProps)(AddLabels);
