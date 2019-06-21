import React from 'react';
import {
  Popover,
  Menu,
  MenuItem,
  Position,
  Button,
  MenuDivider
} from '@blueprintjs/core';
import EditBoard from './EditBoard';
import DeleteBoard from './DeleteBoard';

class EditButtonPopover extends React.Component {
  state = {
    edit: false,
    delete: false
  };
  handleEdit = () => {
    console.log('handleEdit');
    this.setState({ edit: true });
  };
  handleDelete = () => {
    this.setState({ delete: true });
  };

  render() {
    return (
      <div>
        <Popover
          content={
            <Menu style={{ display: 'block' }}>
              <MenuItem
                text="Edit Board Name"
                icon="edit"
                intent="primary"
                onClick={this.handleEdit}
              />
              <MenuDivider />
              <MenuItem
                text="Delete Board"
                icon="trash"
                intent="danger"
                onClick={this.handleDelete}
              />
            </Menu>
          }
          position={Position.RIGHT_BOTTOM}
        >
          <Button
            className={'bp3-icon-standar bp3-icon-edit edit-icon'}
            minimal={true}
          />
        </Popover>
        {this.state.edit ? <EditBoard /> : null}
        {this.state.delete ? <DeleteBoard /> : null}
      </div>
    );
  }
}

export default EditButtonPopover;
