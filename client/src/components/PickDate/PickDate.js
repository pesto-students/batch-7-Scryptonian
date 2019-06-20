import React from 'react';
import { DateInput } from '@blueprintjs/datetime';
import { Button } from '@blueprintjs/core';
import { BASE_URL } from '../../config';
import './PickDate.scss';
import axios from 'axios';
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
        withCredentials: true,
      })
        .then(() => {
          const { boardid, getDataForKanbanView } = this.props;
          successToast(`New due date is set`);
          getDataForKanbanView(boardid);
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
      withCredentials: true,
    })
      .then(() => {
        const { boardid, getDataForKanbanView } = this.props;
        successToast(`Due date removed`);
        getDataForKanbanView(boardid);
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
        <div className="content">
          <span> DueDate: </span>
        </div>
        <DateInput
          formatDate={date => date.toLocaleString().substring(0, 10)}
          onChange={this.handleDateChange}
          parseDate={str => new Date(str)}
          placeholder={'DD/MM/YYYY'}
          value={this.state.date}
        />
        {!this.state.date ? (
          <Button intent="success" onClick={() => this.setDueDate()}>
            Set Due Date
          </Button>
        ) : (
          <>
            <Button intent="success" onClick={() => this.setDueDate()}>
              Set Due Date
            </Button>
            <Button intent="danger" onClick={() => this.removeDueDate()}>
              Remove Due Date
            </Button>
          </>
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
    getDataForKanbanView: boardid => dispatch(actionCreators.getDataForKanbanView(boardid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PickDate);
