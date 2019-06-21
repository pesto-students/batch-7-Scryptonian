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
    this.setState({ edit: true });
  };

  handleDelete = () => {
    this.setState({ delete: true });
  };

  handleEditClose = () => {
    this.setState({ edit: false });
  };

  handleDeleteClose = () => {
    this.setState({ delete: false });
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
        {this.state.edit ? (
          <EditBoard
            boardid={this.props.boardid}
            getAllBoards={this.props.getAllBoards}
            onClose={this.handleEditClose}
          />
        ) : null}
        {this.state.delete ? (
          <DeleteBoard
            boardid={this.props.boardid}
            getAllBoards={this.props.getAllBoards}
            onClose={this.handleDeleteClose}
          />
        ) : null}
      </div>
    );
  }
}

export default EditButtonPopover;
