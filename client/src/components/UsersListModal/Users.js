import React from 'react';
import {
  Button,
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Position,
  Alert
} from '@blueprintjs/core';
import './Users.css';
import { connect } from 'react-redux';
import axios from '../../axios';
import { BASE_URL } from '../../config';
import * as actionCreators from '../../actions/actionDispatchers';
import { successToast, errorToast } from '../Toast/Toast';

export class Users extends React.Component {
  state = {
    deleteUser: false,
    isOpen: true
  };
  handleRole = (user, newRole) => {
    console.log('Inside handleRole', user, this.props.boardid);
    axios(`${BASE_URL}/boards/changerole`, {
      method: 'patch',
      data: {
        userid: user.member,
        username: user.membername,
        newrole: newRole
      },
      params: { boardid: this.props.boardid }
    })
      .then(() => {
        successToast("Successfully changed User's role");
        this.props.getDataForKanbanView(
          this.props.boardid,
          this.props.currentUserId
        );
      })
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

  handleMoveConfirm = () => {
    this.setState({ isOpen: false });
    const user = this.state.user;
    axios(`${BASE_URL}/boards/removeuser`, {
      method: 'patch',
      data: {
        userid: user.member
      },
      params: { boardid: this.props.boardid }
    })
      .then(() => {
        successToast('Successfully Deleted User');
        this.props.getDataForKanbanView(
          this.props.boardid,
          this.props.currentUserId
        );
      })
      .catch(e => errorToast(e.message));
  };
  handleMoveCancel = () => this.setState({ isOpen: false });

  removeUser = user => {
    this.setState({ deleteUser: true, user: user });
    console.log('Inside handleRole', user, this.props.boardid);
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
          {this.state.deleteUser ? (
            <Alert
              cancelButtonText="Cancel"
              confirmButtonText="Delete"
              icon="trash"
              intent="danger"
              isOpen={this.state.isOpen}
              onCancel={this.handleMoveCancel}
              onConfirm={this.handleMoveConfirm}
            >
              <p>Are you sure you want to Delete this User ?</p>
            </Alert>
          ) : null}
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
                            onClick={() => this.handleRole(user, role)}
                          />
                        );
                      })}

                      <MenuDivider />
                      <MenuItem
                        text="Kick Off User"
                        icon="trash"
                        intent="danger"
                        onClick={() => this.removeUser(user)}
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

const mapDispatchToProps = dispatch => {
  return {
    getDataForKanbanView: (boardid, userid) =>
      dispatch(actionCreators.getDataForKanbanView(boardid, userid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
