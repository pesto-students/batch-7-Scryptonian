import React from 'react';
import { Card, Elevation, Divider } from '@blueprintjs/core';

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
      comments,
      id,
      showIssueDetails,
    } = this.props;
    const allLabels = (
      <div className={classes.labels}>
        {labels
          ? labels.map(label => (
              <Label label={label.name} color={label.color} key={label.name + label.color} />
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
      <>
        <Card
          className={classes.issue}
          interactive={true}
          elevation={Elevation.TWO}
          onClick={() => showIssueDetails(id)}
        >
          <p className={classes.issueText}>{issue}</p>
          {allLabels}
          <Divider />
          <div className={classes.meta}>
            <ul>
              <li>
                <Upvote condensed upvotes={upvotes} />
              </li>
              <li>
                <Comment condensed comment={comments ? comments.length : 0} />
              </li>
            </ul>
            {dateAndAssignee}
          </div>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    showIssueDetails: id => dispatch(actionCreators.showIssueDetails(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issue);
