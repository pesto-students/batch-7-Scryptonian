import React from 'react';
import { Button } from '@blueprintjs/core';
import './Users.css';

class Users extends React.Component {
  state = {
    users: ['Amit', 'Rajat', 'Pratiyush'],
    roles: ['SuperAdmin', 'User', 'User']
  };
  render() {
    return (
      <div className="row">
        <div className="column">
          <h3>Users</h3>
          {this.state.users.map((user, i) => (
            <div key={i} className="content">
              {user}
            </div>
          ))}
        </div>
        <div className="column">
          <h3>Role</h3>
          {this.state.roles.map((role, i) => (
            <div key={i} className="content">
              <Button intent="success" small="true">
                {role}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Users;
