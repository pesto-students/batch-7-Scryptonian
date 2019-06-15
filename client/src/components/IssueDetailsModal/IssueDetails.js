import React from 'react';
import {
  Button,
  Dialog,
  Classes,
  Popover,
  Menu,
  Position,
  MenuItem,
  InputGroup
} from '@blueprintjs/core';
import './IssueDetails.css';
import Upvote from '../Upvote/Upvote';
import Comment from '../Comment/Comment';
import PickDate from '../PickDate/PickDate';

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
                <h3 className="issue-header">Add Ballistic missiles</h3>
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
                position={Position.BOTTOM_LEFT}
              >
                <Button rightIcon="arrow-down" text="Labels" />
              </Popover>
            </div>
            <div className="due-date">
              <PickDate />
            </div>
            <div className="assignee">
              <span>Assign to:</span>
              <Popover
                content={
                  <Menu className={Classes.ELEVATION_ONE}>
                    <MenuItem text="Amit" />
                    <MenuItem text="Rajat" />
                  </Menu>
                }
                position={Position.BOTTOM}
              >
                <Button rightIcon="arrow-down" text="Pratiyush" />
              </Popover>
            </div>
            <div className="comments">
              <form>
                <label style={{ margin: '4px' }}>
                  <span>Comment:</span>
                  <InputGroup placeholder="Add your comment" large={true} />
                </label>
              </form>
              <Button intent="success">Done</Button>
            </div>
            <Comment />
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
