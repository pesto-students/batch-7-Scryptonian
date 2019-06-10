import React from 'react';
import classes from './DueDate.module.css';

export const getMonthString = monthIndex => {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  return months[monthIndex];
}

const DueDate = props => {
  const completeDate = new Date(props.date);
  const month = getMonthString([completeDate.getMonth()]);
  const date = completeDate.getDate();
  return (
    <div className={classes.dueDate}>
      <div className={classes.date}>{date}</div>
      <div className={classes.month}>{month}</div>
    </div>
  );
};

export default DueDate;
