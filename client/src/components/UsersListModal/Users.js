import React from 'react';
import { Button } from '@blueprintjs/core';
import './Users.css';

class Users extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="column">
          <h3>Users</h3>
          {this.props.members.map((user) => (
            <div key={user._id} className="content">
              {user.membername}
            </div>
          ))}
        </div>
        <div className="column">
          <h3>Role</h3>
          {this.props.members.map((user) => (
            <div key={user._id} className="content">
              <Button intent="success" small="true">
                {user.role}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Users;
