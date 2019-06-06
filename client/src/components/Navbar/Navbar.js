import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="bp3-navbar bp3-dark">
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">
            <h3>Issue Tracker</h3>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
