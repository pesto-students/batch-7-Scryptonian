import React from 'react';
import { DateInput } from '@blueprintjs/datetime';
import './PickDate.scss';

class PickDate extends React.Component {
  state = {
    closeOnSelection: true,
    date: null,
    disabled: false
  };

  handleDateChange = date => {
    this.setState({ date: new Date(date) });
  };
  render() {
    return (
      <div>
        <DateInput
          formatDate={date => date.toLocaleString()}
          onChange={this.handleDateChange}
          parseDate={str => new Date(str)}
          placeholder={'M/D/YYYY'}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default PickDate;
