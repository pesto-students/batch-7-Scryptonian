import React from 'react';
import { Card, Elevation, Divider } from '@blueprintjs/core';

import Label from '../Label/Label';
import Upvote from '../Upvote/Upvote';
import Comment from '../Comment/Comment';
import DueDate from '../DueDate/DueDate';
import Assignee from '../Assignee/Assignee';
import classes from './Issue.module.css';

const Issue = props => {
  const allLabels = (
    <div className={classes.labels}>
      {props.labels
        ? props.labels.map(label => (
            <Label label={label.name} color={label.color} key={label.name + label.color} />
          ))
        : null}
    </div>
  );

  const dateAndAssignee = (
    <div className={classes.metaRight}>
      {props.assignee ? <Assignee name={props.assignee.name} /> : null}
      {props.dueDate ? <DueDate date={props.dueDate} /> : null}
    </div>
  );
  return (
    <>
      <Card className={classes.issue} interactive={true} elevation={Elevation.TWO}>
        <p className={classes.issueText}>{props.issue}</p>
        {allLabels}
        <Divider />
        <div className={classes.meta}>
          <ul>
            <li>
              <Upvote condensed upvotes={props.upvotes}/>
            </li>
            <li>
              <Comment condensed comment={props.comments ? props.comments.length : 0}/>
            </li>
          </ul>
          {dateAndAssignee}
        </div>
      </Card>
    </>
  );
};

export default Issue;
