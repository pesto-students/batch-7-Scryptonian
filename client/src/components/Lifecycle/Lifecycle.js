import React from 'react';
import { Card, Elevation, Divider } from '@blueprintjs/core';
import NewIssue from '../NewIssue/NewIssue';
import Issue from '../Issue/Issue';
import classes from './Lifecycle.module.css';

const Lifecycle = props => (
  <Card elevation={Elevation.ONE} className={classes.Lifecycle}>
    <h3>{props.name}</h3>
    <Divider />
    {props.issues
      ? props.issues.map(issue => (
          <Issue
            issue={issue.issue}
            key={issue._id}
            labels={issue.tags}
            assignee={issue.assignee}
            dueDate={issue.dueDate}
            upvotes={issue.upvotes}
            comments={issue.comments}
            id={issue._id}
          />
        ))
      : null}
    <NewIssue lifecycleid={props.lifecycleid} />
  </Card>
);

export default Lifecycle;
