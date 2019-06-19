import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { Draggable } from 'react-beautiful-dnd';

import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

import Label from '../Label/Label';
import Upvote from '../Upvote/Upvote';
import Comment from '../Comment/Comment';
import DueDate from '../DueDate/DueDate';
import Assignee from '../Assignee/Assignee';
import classes from './Issue.module.css';

export class Issue extends React.Component {
  handleIssueCardClick = () => {};

  render() {
    const {
      labels,
      assignee,
      dueDate,
      issue,
      upvotes,
      upvotedBy,
      comments,
      id,
      showIssueDetails,
      index
    } = this.props;

    const userId = this.props.currentUserId;
    const upvotedState = upvotedBy.includes(userId);

    const allLabels = (
      <div className={classes.labels}>
        {labels
          ? labels.map(label => (
              <Label
                label={label.name}
                color={label.color}
                key={label.name + label.color}
              />
            ))
          : null}
      </div>
    );

    const dateAndAssignee = (
      <div className={classes.metaRight}>
        {assignee ? <Assignee name={assignee.name} /> : null}
        {dueDate ? <DueDate date={dueDate} /> : null}
      </div>
    );

    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card
              className={[classes.issue, classes.issueCard]}
              interactive={true}
              elevation={Elevation.TWO}
            >
              <div onClick={() => showIssueDetails(id)}>
                <p className={classes.issueText}>{issue}</p>
                {allLabels}
              </div>
              <div className={classes.meta}>
                <ul>
                  <li>
                    <Upvote
                      condensed
                      upvotes={upvotes}
                      issueid={id}
                      upvoted={upvotedState}
                    />
                  </li>
                  <li>
                    <Comment
                      condensed
                      commentCount={comments ? comments.length : 0}
                    />
                  </li>
                </ul>
                {dateAndAssignee}
              </div>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showIssueDetails: id => dispatch(actionCreators.showIssueDetails(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issue);
