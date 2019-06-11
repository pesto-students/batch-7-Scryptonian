import React from 'react';
import {
  Button,
  Dialog,
  Classes,
  Popover,
  Menu,
  Position,
  MenuItem
} from '@blueprintjs/core';
import './IssueDetails.css';
import Upvote from '../Upvote/Upvote';
import { HEADER } from '@blueprintjs/icons/lib/esm/generated/iconNames';

class IssueDetails extends React.Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: false,
    usePortal: true,
    round: true
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };
  render() {
    return (
      <div>
        <Button onClick={this.handleOpen}>Open Issue Details</Button>
        <Dialog
          onClose={this.handleClose}
          title="Issue Details"
          {...this.state}
        >
          <div className={Classes.DIALOG_BODY}>
            <div className="row">
              <div className="column">
                <HEADER>
                  <b>Add Ballistic missiles</b>
                </HEADER>
              </div>
              <div className="column">
                <Upvote />
              </div>
            </div>
            <div className="label">
              <Popover
                content={
                  <Menu className={Classes.ELEVATION_ONE}>
                    <MenuItem text="Feature" />
                    <MenuItem text="Difficult" />
                  </Menu>
                }
                position={Position.RIGHT_BOTTOM}
              >
                <Button icon="share" text="Labels" />
              </Popover>
            </div>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <Button onClick={this.handleClose}>Close</Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default IssueDetails;
