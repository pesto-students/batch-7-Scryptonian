import React from 'react';
import { EditableText, Card, Button } from '@blueprintjs/core';
import classes from './NewIssue.module.css';

const NewIssue = () => {
  return (
    <Card className={classes.NewIssue}>
      <EditableText
        confirmOnEnter={false}
        placeholder="New Issue..."
        multiline={true}
        minLines={2}
      />
      <Button text="Add issue" />
    </Card>
  );
};

export default NewIssue;
