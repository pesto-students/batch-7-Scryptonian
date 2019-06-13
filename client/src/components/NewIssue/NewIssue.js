import React from 'react';
import { EditableText, Card, Button } from '@blueprintjs/core';
import classes from './NewIssue.module.css';
import axios from 'axios';
import { BASE_URL } from '../../config';

class NewIssue extends React.Component {
  state = {
    newIssueText: '',
  };

  handleTextChange = text => {
    this.setState({ newIssueText: text });
  };

  handleCreateNewIssue = () => {
    const { newIssueText } = this.state;
    if (newIssueText === '') {
      return;
    }
    axios(`${BASE_URL}/issues`, {
      method: 'post',
      data: {
        lifecycleid: this.props.lifecycleid,
        issue: this.state.newIssueText,
      },
      withCredentials: true,
    })
      .then(() => this.setState({ newIssueText: '' }))
      .catch(e => {});
  };

  render() {
    return (
      <Card className={classes.NewIssue}>
        <EditableText
          confirmOnEnter={false}
          placeholder="New Issue..."
          multiline={true}
          minLines={2}
          onChange={text => this.handleTextChange(text)}
          value={this.state.newIssueText}
        />
        <Button text="Add issue" onClick={() => this.handleCreateNewIssue()} />
      </Card>
    );
  }
}

export default NewIssue;
