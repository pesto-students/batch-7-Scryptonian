import React from 'react';
import './Navbar.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { connect } from 'react-redux';
import {
  Menu,
  Popover,
  PopoverInteractionKind,
  Position,
  Button,
  Intent
} from '@blueprintjs/core';
import { LogoutUrl } from '../../config';
import * as actionCreators from '../../actions/actionDispatchers';

const mapStateToProps = state => {
  const {
    displayName,
    emailId,
    profileImgUrl,
    isAuthenticated,
    currentBoardName
  } = state;
  return {
    displayName,
    emailId,
    profileImgUrl,
    isAuthenticated,
    currentBoardName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMemberListModal: () =>
      dispatch(actionCreators.toggleMemberListModal())
  };
};

export class Navbar extends React.Component {
  render() {
    let popoverContent = (
      <Menu>
        <ul className="bp3-menu">
          <li className="bp3-menu-header">
            <h6 className="bp3-heading">{this.props.emailId}</h6>
          </li>
          <li>
            <button
              type="button"
              className="bp3-menu-item bp3-icon-log-out"
              onClick={() => (window.location.href = LogoutUrl)}
            >
              Logout
            </button>
          </li>
        </ul>
      </Menu>
    );
    return (
      <nav className="custom-nav bp3-navbar bp3-dark">
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading ">
            <h3>
              <span className="bp3-icon bp3-icon-standard  bp3-icon-search-around" />
              Scrypt<span style={{ fontWeight: '100' }}>onian</span>
            </h3>
          </div>
          {this.props.currentBoardName ? (
            <>
              <span className="bp3-navbar-divider" />
              <h4 style={{ fontWeight: '100' }}>
                <span
                  className="bp3-icon bp3-icon-standard  bp3-icon-layout-hierarchy"
                  style={{ marginRight: '10px' }}
                />
                {this.props.currentBoardName}
              </h4>
              <span className="bp3-navbar-divider" />
              <Button
                small={true}
                intent={Intent.SUCCESS}
                icon="user"
                text="Member list"
                onClick={this.props.toggleMemberListModal}
              />
            </>
          ) : null}
        </div>
        {this.props.isAuthenticated ? (
          <div className="bp3-navbar-group bp3-align-right">
            <span className="bp3-navbar-divider" />
            <span>
              <img
                className="profileThumbnail"
                src={this.props.profileImgUrl}
                alt="Profile Thumbnail"
              />
            </span>
            <span>{this.props.displayName}</span>
            <span className="bp3-navbar-divider" />
            <Popover
              content={popoverContent}
              enforceFocus={false}
              position={Position.BOTTOM_LEFT}
              interactionKind={PopoverInteractionKind.CLICK}
            >
              <Button className="bp3-minimal">
                <span className="bp3-icon-standard bp3-icon-cog" />
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
  mapDispatchToProps
)(Navbar);
