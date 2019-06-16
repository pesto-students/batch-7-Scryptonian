import React from 'react';
import { EditableText, Card, Button } from '@blueprintjs/core';
import classes from './NewIssue.module.css';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

export class NewIssue extends React.Component {
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
      .then(() => {
        const { boardid, getDataForKanbanView } = this.props;
        this.setState({ newIssueText: '' });
        getDataForKanbanView(boardid);
      })
      .catch(e => {}); // TODO: Show error in pop-up
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

const mapStateToProps = state => {
  return {
    boardid: state.currentBoardId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataForKanbanView: boardid => dispatch(actionCreators.getDataForKanbanView(boardid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewIssue);
