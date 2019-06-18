import React from 'react';
import './Labels.css';
import {
  Popover,
  Position,
  Classes,
  Button,
  Menu,
  MenuItem
} from '@blueprintjs/core';
import { BlockPicker } from 'react-color';

class Labels extends React.Component {
  state = { color: '', name: '' };

  handleColorChange = e => {
    this.setState({ color: e });
    console.log(e.hex);
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  render() {
    return (
      <div>
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
              {/* <MenuItem text="Feature" />
              <MenuItem text="Difficult" /> */}
              <div className="add-color">
                <label>
                  Color:
                  <BlockPicker />
                </label>
              </div>
            </Menu>
          }
          position={Position.BOTTOM_LEFT}
        >
          <Button rightIcon="arrow-down" text="Labels" />
        </Popover>
      </div>
    );
  }
}

export default Labels;
