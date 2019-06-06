import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import './BoardBox.css';

const BoardBox = () => {
  return (
    <Card
      interactive={true}
      elevation={Elevation.TWO}
      className="board-container"
    >
      <p>Create New</p>
    </Card>
  );
};

export default BoardBox;
