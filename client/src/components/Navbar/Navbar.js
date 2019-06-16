import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { connect } from 'react-redux';
import {
  Menu,
  Popover,
  PopoverInteractionKind,
  Position,
  Button
} from '@blueprintjs/core';
import { LogoutUrl } from '../../config';

const mapStateToProps = state => {
  const { displayName, emailId, profileImgUrl, isAuthenticated } = state;
  return { displayName, emailId, profileImgUrl, isAuthenticated };
};

export class Navbar extends React.Component {
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
              onClick={() => (window.location.href = LogoutUrl)}
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
        {this.props.isAuthenticated ? (
          <div class="bp3-navbar-group bp3-align-right">
            <span class="bp3-navbar-divider" />
            <span>
              <img
                className="profileThumbnail"
                src={this.props.profileImgUrl}
              />
            </span>
            <span>{this.props.displayName}</span>
            <span class="bp3-navbar-divider" />
            <Popover
              content={popoverContent}
              enforceFocus={false}
              position={Position.BOTTOM_LEFT}
              interactionKind={PopoverInteractionKind.CLICK}
            >
              <Button className="bp3-minimal">
                <span class="bp3-icon-standard bp3-icon-cog" />
              </Button>
            </Popover>
          </div>
        ) : null}
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Navbar);
