import React from 'react';
import UpvoteIcon from '../../assets/UpvoteIcon';
import classes from './Upvote.module.css';
import { Divider } from '@blueprintjs/core';

const Upvote = props => {
  const upvoteComponentClass = props.upvoted ? classes.upvoted : classes.didNotUpvote;
  const upvoteIcon = props.upvoted ? <UpvoteIcon upvoted /> : <UpvoteIcon />;
  return (
    <div className={upvoteComponentClass}>
      {upvoteIcon}
      {props.condensed ? null : (
        <>
          Upvote
          <Divider className={classes.divider} />
        </>
      )}
      <div className={classes.upvoteCount}>{props.upvotes ? props.upvotes : 0}</div>
    </div>
  );
};

export default Upvote;
