import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import './BoardBox.css';

const BoardBox = props => {
  return (
    <Card
      interactive={true}
      elevation={Elevation.TWO}
      className="board-container"
      onClick={() => props.addNewBoard()}
    >
      {props.boardRole === 'SUPERADMIN' ? (
        <span className={'bp3-icon-standard bp3-icon-crown custom-icon'} />
      ) : props.boardRole === 'CREATE' ? (
        <span className={'bp3-icon-standard bp3-icon-plus'} />
      ) : (
        <span className={'bp3-icon-standard bp3-icon-user custom-icon'} />
      )}

      <p>{props.boardName}</p>
      <p className={'bp3-text-small bp3-text-muted'}>
        {props.createdBy ? `Author ${props.createdBy}` : null}
      </p>
    </Card>
  );
};
export default BoardBox;
