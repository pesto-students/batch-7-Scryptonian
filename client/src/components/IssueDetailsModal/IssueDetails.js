import React from 'react';
import {
  Button,
  Dialog,
  Classes,
  Popover,
  Menu,
  Position,
  MenuItem,
  InputGroup,
} from '@blueprintjs/core';
import './IssueDetails.css';
import Upvote from '../Upvote/Upvote';
import Comment from '../Comment/Comment';
import PickDate from '../PickDate/PickDate';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import Issue from '../Issue/Issue';

export class IssueDetails extends React.Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: true,
    usePortal: true,
    round: true,
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.closeModal();
  };
  render() {
    const issue = this.props.selectedIssue
      ? this.props.selectedIssue
      : {
          issue: 'Loading...',
          upvotes: 0,
          assignee: 'Loading...',
        };
    const members = [];

    return (
      <div>
        <Dialog onClose={this.handleClose} title="Issue Details" {...this.state}>
          <div className={Classes.DIALOG_BODY}>
            <div className="row">
              <div className="column">
                <h3 className="issue-header">{issue.issue}</h3>
              </div>
              <div className="column">
                <Upvote upvotes={issue.upvotes} />
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
            {isNaN(new Date(issue.dueDate)) ? (
              <Button intent="success">Add Due Date</Button>
            ) : (
              <Button intent="success">Remove Due Date</Button>
            )}
            <div className="assignee">
              <span>Assign to:</span>
              <Popover
                position={Position.BOTTOM}
                content={
                  <Menu className={Classes.ELEVATION_ONE}>
                    {members.map(member => (
                      <MenuItem text={member.name} key={member._id} />
                    ))}
                  </Menu>
                }
              >
                <Button
                  rightIcon="arrow-down"
                  text={issue.assignee ? issue.assignee.name : 'None'}
                />
              </Popover>
            </div>
            <div className="comments">
              <form>
                <label style={{ margin: '4px' }}>
                  <span>Comment:</span>
                  <InputGroup placeholder="Add your comment" large={true} />
                </label>
              </form>
              <Button intent="success">Add Comment</Button>
            </div>
            <Comment />
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedIssue: state.selectedIssue,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actionCreators.closeIssueDetailsModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssueDetails);
