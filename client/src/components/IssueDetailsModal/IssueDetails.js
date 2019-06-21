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
  Card
} from '@blueprintjs/core';
import './IssueDetails.css';
import Upvote from '../Upvote/Upvote';
import Comment from '../Comment/Comment';
import AddLabels from '../LabelsComponent/AddLabels';
import ViewLabels from '../LabelsComponent/ViewLabels';
import PickDate from '../PickDate/PickDate';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { errorToast, successToast } from '../Toast/Toast';

export class IssueDetails extends React.Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: true,
    usePortal: true,
    round: true,
    commentInputText: ''
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.closeModal();
  };

  handleCommentInputChange = ({ target }) => {
    this.setState({ commentInputText: target.value });
  };

  handleAddCommentOnClick = () => {
    const { commentInputText } = this.state;
    const {
      showIssueDetails,
      getDataForKanbanView,
      currentBoardId,
      currentUserId
    } = this.props;
    const issueid = this.props.selectedIssue._id;

    if (commentInputText === '') {
      return;
    }

    const ADD_COMMENT_URL = `${BASE_URL}/issues/${issueid}/comment`;
    axios(ADD_COMMENT_URL, {
      method: 'post',
      data: {
        comment: commentInputText
      }
    })
      .then(res => {
        this.setState({ commentInputText: '' });
        successToast('Comment added');
        showIssueDetails(res.data._id);
        getDataForKanbanView(currentBoardId, currentUserId);
      })
      .catch(e => errorToast(e.message));
  };

  handleDeleteIssue = () => {
    const issueid = this.props.selectedIssue._id;
    const boardid = this.props.currentBoardId;
    const { getDataForKanbanView, currentUserId } = this.props;

    const deleteIssueURL = `${BASE_URL}/issues/${issueid}`;
    axios(deleteIssueURL, {
      method: 'delete',
      params: { boardid }
    })
      .then(res => {
        this.handleClose();
        successToast('Issue deleted');
        getDataForKanbanView(boardid, currentUserId);
      })
      .catch(e => errorToast(e.message));
  };

  handleDeleteCommentOnClick = comment => {
    const issueid = this.props.selectedIssue._id;
    const commentid = comment._id;
    const {
      showIssueDetails,
      getDataForKanbanView,
      currentBoardId,
      currentUserId
    } = this.props;
    const deleteCommentURL = `${BASE_URL}/issues/${issueid}/comment/${commentid}`;
    axios(deleteCommentURL, {
      method: 'delete'
    })
      .then(res => {
        successToast('Comment deleted');
        showIssueDetails(res.data._id);
        getDataForKanbanView(currentBoardId, currentUserId);
      })
      .catch(e => errorToast(e.message));
  };

  getTimeDifference = date => {
    const givenDate = new Date(date).getTime();
    const currentDate = new Date().getTime();
    if (currentDate < givenDate) {
      return 'now!';
    }
    const differenceInMinutes = Math.abs(currentDate - givenDate) / (1000 * 60);

    if (differenceInMinutes < 1) {
      return 'now';
    }
    if (differenceInMinutes < 60) {
      const minutes = Math.floor(differenceInMinutes);
      return minutes === 1 ? `1 min ago` : `${minutes} mins ago`;
    }
    const differenceInHours = differenceInMinutes / 60;
    if (differenceInHours < 24) {
      const hours = Math.floor(differenceInHours);
      return hours === 1 ? `1 hour ago` : `${hours} hours ago`;
    }
    const days = Math.floor(differenceInHours / 24);
    return days === 1 ? `1 day ago` : `${days} days ago`;
  };

  render() {
    console.log(this.props.members);
    const issue = this.props.selectedIssue
      ? this.props.selectedIssue
      : {
          issue: 'Loading...',
          upvotes: 0,
          assignee: 'Loading...',
          upvotedBy: []
        };
    //const members = [];
    const userId = this.props.currentUserId;
    const upvotedState = issue.upvotedBy.includes(userId);
    const { commentInputText } = this.state;

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          title="Issue Details"
          {...this.state}
        >
          <div className={Classes.DIALOG_BODY}>
            <div className="row">
              <div className="column">
                <h3 className="issue-header">{issue.issue}</h3>
              </div>
              <div className="column">
                <Upvote
                  upvotes={issue.upvotes}
                  issueid={issue._id}
                  upvoted={upvotedState}
                />
              </div>
            </div>
            <div className="label">
              <ViewLabels />
              <AddLabels />
            </div>
            <div className="due-date">
              <PickDate dueDate={issue.dueDate} issueid={issue._id} />
            </div>
            <div className="assignee">
              <span>Assign to:</span>
              <Popover
                position={Position.BOTTOM}
                content={
                  <Menu className={Classes.ELEVATION_ONE}>
                    {this.props.members.map(member => (
                      <MenuItem text={member} />
                    ))}
                  </Menu>
                }
              >
                <Button rightIcon="arrow-down" text="None" />
              </Popover>
            </div>
            <div className="comments">
              {issue.comments
                ? issue.comments.map(comment => (
                    <Card key={comment._id}>
                      <p>{comment.comment}</p>
                      <p>
                        {comment.commentedBy ? comment.commentedBy.name : null}{' '}
                        {this.getTimeDifference(comment.createdAt)}
                      </p>
                      <Popover commentid={comment._id}>
                        <Button intent="danger" text="Delete Comment" />
                        <DeleteConfirmation
                          onSuccess={() =>
                            this.handleDeleteCommentOnClick(comment)
                          }
                          item="comment"
                        />
                      </Popover>
                    </Card>
                  ))
                : null}

              <form>
                <div style={{ margin: '4px' }}>
                  <label>Comment:</label>
                  <InputGroup
                    placeholder="Add your comment"
                    value={commentInputText}
                    onChange={event => this.handleCommentInputChange(event)}
                  />
                </div>
              </form>
              <Button
                intent="success"
                onClick={() => this.handleAddCommentOnClick()}
              >
                Add Comment
              </Button>
            </div>
            <Comment />
            <Popover>
              <Button intent="danger" text="Delete Issue" />
              <DeleteConfirmation
                onSuccess={this.handleDeleteIssue}
                item="issue"
              />
            </Popover>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedIssue: state.selectedIssue,
    currentUserId: state.currentUserId,
    currentBoardId: state.currentBoardId,
    members: state.boardMemberList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actionCreators.closeIssueDetailsModal()),
    showIssueDetails: issueid =>
      dispatch(actionCreators.showIssueDetails(issueid)),
    getDataForKanbanView: (boardid, userid) =>
      dispatch(actionCreators.getDataForKanbanView(boardid, userid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueDetails);
