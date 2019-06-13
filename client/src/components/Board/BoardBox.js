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
      <p>{props.boardName}</p>
    </Card>
  );
};
export default BoardBox;
