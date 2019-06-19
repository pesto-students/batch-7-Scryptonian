import React from 'react';
import { Card, Button, InputGroup } from '@blueprintjs/core';
import classes from './NewIssue.module.css';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

export class NewIssue extends React.Component {
  state = {
    newIssueText: ''
  };

  handleTextChange = event => {
    this.setState({ newIssueText: event.target.value });
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
        issue: this.state.newIssueText
      },
      withCredentials: true
    })
      .then(() => {
        const { boardid, getDataForKanbanView, currentUserId } = this.props;
        this.setState({ newIssueText: '' });
        getDataForKanbanView(boardid, currentUserId);
      })
      .catch(e => {}); // TODO: Show error in pop-up
  };

  render() {
    const addIssue = _ => {
      return (
        <Button
          icon={'add'}
          minimal={true}
          onClick={() => this.handleCreateNewIssue()}
        />
      );
    };
    return (
      <Card className={classes.NewIssue}>
        <InputGroup
          className={classes.addIssueInput}
          placeholder="New Issue..."
          fill={true}
          value={this.state.newIssueText}
          onChange={event => this.handleTextChange(event)}
          rightElement={addIssue()}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    boardid: state.currentBoardId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataForKanbanView: (boardid, userid) =>
      dispatch(actionCreators.getDataForKanbanView(boardid, userid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewIssue);
