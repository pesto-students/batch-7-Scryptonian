import React from 'react';
import { Card, Elevation, Icon, Intent } from '@blueprintjs/core';
import { Droppable } from 'react-beautiful-dnd';
import NewIssue from '../NewIssue/NewIssue';
import Issue from '../Issue/Issue';
import classes from './Lifecycle.module.css';

class Lifecycle extends React.Component {
  render() {
    const { name, issues, lifecycleid } = this.props;
    return (
      <Card elevation={Elevation.ONE} className={classes.Lifecycle}>
        <h3>
          <Icon
            icon={'page-layout'}
            iconSize={Icon.SIZE_STANDARD}
            intent={Intent.NONE}
          />
          {name}
        </h3>
        {issues ? (
          <Droppable droppableId={this.props.lifecycleid}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={classes.IssueList}
              >
                {issues.map((issue, index) => {
                  return (
                  <Issue
                    issue={issue.issue}
                    key={issue._id}
                    labels={issue.labels}
                    assignee={issue.assignee}
                    dueDate={issue.dueDate}
                    upvotes={issue.upvotes}
                    upvotedBy={issue.upvotedBy}
                    comments={issue.comments}
                    id={issue._id}
                    index={index}
                  />
                )})}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : null}
        <NewIssue lifecycleid={lifecycleid} />
      </Card>
    );
  }
}

export default Lifecycle;
