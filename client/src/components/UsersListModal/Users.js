import React from 'react';
import {
  Button,
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Position
} from '@blueprintjs/core';
import './Users.css';
import { connect } from 'react-redux';

class Users extends React.Component {
  render() {
    console.log(this.props.roleInCurrentBoard);
    return (
      <div className="row">
        <div className="column">
          <h3>Users</h3>
          {this.props.members.map(user => (
            <div key={user._id} className="content">
              {user.membername}
            </div>
          ))}
        </div>
        <div className="column">
          <h3>Role</h3>
          {this.props.members.map(user => (
            <div key={user._id} className="content">
              {this.props.roleInCurrentBoard === 'SUPERADMIN' ? (
                <Popover
                  content={
                    <Menu style={{ display: 'block' }}>
                      <MenuItem
                        text=" Make SuperAdmin"
                        icon="edit"
                        intent="primary"
                      />
                      <MenuDivider />
                      <MenuItem
                        text="Make Admin"
                        icon="edit"
                        intent="primary"
                      />
                      <MenuDivider />
                      <MenuItem text="Make User" icon="edit" intent="primary" />
                    </Menu>
                  }
                  position={Position.BOTTOM_RIGHT}
                >
                  <Button small="true" rightIcon="caret-down">
                    {user.role}
                  </Button>
                </Popover>
              ) : (
                <Button small="true">{user.role}</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    roleInCurrentBoard: state.roleInCurrentBoard
  };
};

export default connect(mapStateToProps)(Users);
