import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { connect } from 'react-redux';
import {
  Menu,
  MenuDivider,
  MenuItem,
  Intent,
  Popover,
  PopoverInteractionKind,
  Position,
  Button
} from '@blueprintjs/core';

const mapStateToProps = state => {
  const { displayName, emailId, profileImgUrl } = state;
  console.log(state, 'navbar');
  return { displayName, emailId, profileImgUrl };
};

class Navbar extends React.Component {
  render() {
    let popoverContent = (
      <Menu>
        <ul class="bp3-menu">
          <li class="bp3-menu-header">
            <h6 class="bp3-heading">{this.props.emailId}</h6>
          </li>
          <li>
            <button
              type="button"
              class="bp3-menu-item bp3-icon-log-out"
              onClick={() =>
                (window.location.href = 'http://localhost:8000/auth/logout')
              }
            >
              Logout
            </button>
          </li>
        </ul>
      </Menu>
    );
    return (
      <nav className="bp3-navbar bp3-dark">
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">
            <h3>Issue Tracker</h3>
          </div>
          <span class="bp3-navbar-divider" />
          <button class="bp3-button bp3-minimal bp3-icon-home">Home</button>
        </div>
        {this.props.emailId}
        <div class="bp3-navbar-group bp3-align-right">
          <span class="bp3-navbar-divider" />
          <button class="bp3-button bp3-minimal">
            <span>
              <img
                className="profileThumbnail"
                src={this.props.profileImgUrl}
              />
            </span>
          </button>
          <span>{this.props.displayName}</span>
          <span class="bp3-navbar-divider" />
          {/* <a href="http://localhost:8000/auth/logout">
            <span class="bp3-icon-standard bp3-icon-log-out" />
          </a> */}
          <Popover
            content={popoverContent}
            enforceFocus={false}
            position={Position.BOTTOM_LEFT}
            interactionKind={PopoverInteractionKind.CLICK}
          >
            <Button>
              <span class="bp3-icon-standard bp3-icon-log-out" />
            </Button>
          </Popover>
        </div>
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Navbar);
