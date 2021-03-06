import React from 'react';
import { DateInput } from '@blueprintjs/datetime';
import { Button } from '@blueprintjs/core';
import { BASE_URL } from '../../config';
import './PickDate.scss';
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { errorToast, successToast } from '../Toast/Toast';

class PickDate extends React.Component {
  state = {
    closeOnSelection: true,
    date: null,
    disabled: false,
  };

  handleDateChange = date => {
    this.setState({ date: new Date(date) });
  };

  setDueDate = () => {
    const date = this.state.date;
    const { issueid } = this.props;
    const setDueDateURL = `${BASE_URL}/issues/${issueid}/duedate`;
    if (date) {
      axios(setDueDateURL, {
        method: 'patch',
        data: {
          duedate: date,
        },
      })
        .then(() => {
          const { boardid, getDataForKanbanView, currentUserId } = this.props;
          successToast(`New due date is set`);
          getDataForKanbanView(boardid, currentUserId);
        })
        .catch(e => errorToast(e.message));
    }
  };

  removeDueDate = () => {
    const { issueid } = this.props;
    this.setState({ date: null });
    const setDueDateURL = `${BASE_URL}/issues/${issueid}/duedate`;
    axios(setDueDateURL, {
      method: 'patch',
      data: {
        duedate: null,
      },
    })
      .then(() => {
        const { boardid, getDataForKanbanView, currentUserId } = this.props;
        successToast(`Due date removed`);
        getDataForKanbanView(boardid, currentUserId);
      })
      .catch(e => errorToast(e.message));
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.dueDate !== nextProps.dueDate && nextProps.dueDate !== null) {
      this.setState({ date: new Date(nextProps.dueDate) });
    }
  }

  render() {
    return (
      <div>
        <span style={{ fontWeight: '600' }}>Due Date : </span>
        <DateInput
          formatDate={date => date.toLocaleString().substring(0, 10)}
          onChange={this.handleDateChange}
          parseDate={str => new Date(str)}
          placeholder={'DD/MM/YYYY'}
          value={this.state.date}
        />
        {!this.state.date ? (
          <Button small={true} intent="success" onClick={() => this.setDueDate()}>
            Set Date
          </Button>
        ) : (
          <div style={{ display: 'inline-flex', marginTop: '5px' }}>
            <Button small={true} intent="success" onClick={() => this.setDueDate()} style={{marginRight: '5px'}}>
              Set Date
            </Button>
            <Button small={true} intent="danger" onClick={() => this.removeDueDate()}>
              Remove Date
            </Button>
          </div>
        )}
      </div>
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
    getDataForKanbanView: (boardid, userid) =>
      dispatch(actionCreators.getDataForKanbanView(boardid, userid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PickDate);
