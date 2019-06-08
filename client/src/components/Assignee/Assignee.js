import React from 'react';
import classes from './Assignee.module.css';

const Assignee = props => {
  return <div className={classes.assignee}>{props.name}</div>;
};

export default Assignee;
