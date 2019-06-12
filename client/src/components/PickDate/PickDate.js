import React from 'react';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';
import moment from 'moment';

const momentFormatter = format => {
  return {
    formatDate: date => moment(date).format(format),
    placeholder: `${format} (moment)`,
    parseDate: str => moment(str, format).toDate()
  };
};

const FORMATS = [
  {
    formatDate: date => (date == null ? '' : date.toLocaleDateString()),
    placeholder: 'JS Date',
    parseDate: str => new Date(Date.parse(str))
  },
  momentFormatter('MM/DD/YYYY'),
  momentFormatter('YYYY-MM-DD'),
  momentFormatter('YYYY-MM-DD HH:mm:ss')
];

class PickDate extends React.Component {
  state = {
    closeOnSelection: true,
    date: null,
    disabled: false,
    format: FORMATS[0],
    reverseMonthAndYearMenus: false,
    timePrecision: undefined
  };

  handleDateChange = date => {
    this.setState({ date: new Date(date) });
  };
  render() {
    const { date, format, ...spreadProps } = this.state;
    return (
      <div>
        <DateInput
          {...spreadProps}
          {...format}
          // formatDate={date => date.toLocaleString()}
          onChange={this.handleDateChange}
          // parseDate={str => new Date(str)}
          placeholder={'M/D/YYYY'}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default PickDate;
