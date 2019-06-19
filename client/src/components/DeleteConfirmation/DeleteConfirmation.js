import React from 'react';
import { Button, H5, Classes, Intent } from '@blueprintjs/core';
import classes from './DeleteConfirmation.module.css';

const DeleteConfirmation = props => {
  return (
    <div className={Classes.POPOVER_CONTENT_SIZING} style={{ padding: '20px', maxWidth: '400px' }}>
      <H5>Confirm deletion</H5>
      <p>
        Are you sure you want to delete this {props.item}? You won't be able to recover it later.
      </p>
      <div className={classes.buttonGroup}>
        <Button className={Classes.POPOVER_DISMISS} style={{ marginRight: 10 }}>
          Cancel
        </Button>
        <Button
          intent={Intent.DANGER}
          className={Classes.POPOVER_DISMISS}
          onClick={() => props.onSuccess()}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
