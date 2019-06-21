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
import axios from '../../axios';
import { BASE_URL } from '../../config';
import { successToast, errorToast } from '../Toast/Toast';

export class Users extends React.Component {
  handleRole = user => {
    console.log('Inside handleRole');
    axios(`${BASE_URL}/boards/changerole`, {
      method: 'patch',
      data: {
        userid: user.member,
        username: user.membername,
        newrole: user.role
      },
      params: { boardid: this.props.boardid }
    })
      .then(() => successToast("Successfully changed User's role"))
      .catch(e => errorToast(e.message));
  };

  get = userRole => {
    if (userRole === 'USER') {
      return ['SUPERADMIN', 'ADMIN'];
    }
    if (userRole === 'ADMIN') {
      return ['SUPERADMIN', 'USER'];
    }
    if (userRole === 'SUPERADMIN') {
      return ['ADMIN', 'USER'];
    }
  };

  removeUser = () => {
    console.log('Inside remove user');
  };
  getLowercase(role) {
    const firstLetter = role.split('')[0];
    const rest = role
      .split('')
      .splice(1)
      .join('')
      .toLowerCase();
    return firstLetter + rest;
  }
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
                      <MenuDivider title="Change to" />
                      {this.get(user.role).map((role, index) => {
                        return (
                          <MenuItem
                            text={this.getLowercase(role)}
                            key={index}
                            icon="user"
                            intent="primary"
                            onClick={() => this.handleRole(user)}
                          />
                        );
                      })}

                      <MenuDivider />
                      <MenuItem
                        text="Kick Off User"
                        icon="trash"
                        intent="danger"
                        onClick={this.removeUser}
                      />
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
    roleInCurrentBoard: state.roleInCurrentBoard,
    boardid: state.currentBoardId
  };
};

export default connect(mapStateToProps)(Users);
