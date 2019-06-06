import React from 'react';
import CommentIcon from '../../assets/CommentIcon';
import { Divider } from '@blueprintjs/core';
import classes from './Comment.module.css';

const Comment = props => {
  const count = props.commentCount ? props.commentCount : 0;
  return (
    <div className={classes.comment}>
      <CommentIcon />
      {!props.condensed ? null : (
        <>
          Comments
          <Divider className={classes.divider} />
        </>
      )}
      <span className={classes.commentCount}>{count}</span>
    </div>
  );
};

export default Comment;
