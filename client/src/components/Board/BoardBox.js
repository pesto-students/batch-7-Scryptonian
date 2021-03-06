import React from 'react';
import EditButtonPopover from './EditButtonPopover';
import { Card, Elevation } from '@blueprintjs/core';
import './BoardBox.css';

class BoardBox extends React.Component {
  state = {
    disableClick: false
  };

  handleClick = e => {
    e.preventDefault();
    if (!this.state.disableClick) {
      this.props.openKanban();
    }
  };

  toggleClickHandle = e => {
    e.preventDefault();
    this.setState({
      disableClick: !this.state.disableClick
    });
  };

  render() {
    const { props } = this;
    return (
      <>
        <Card
          interactive={true}
          elevation={Elevation.TWO}
          className="board-container"
        >
          {props.boardRole === 'SUPERADMIN' ? (
            <>
              <EditButtonPopover
                className="edit-icon"
                boardid={props.boardid}
                getAllBoards={this.props.getAllBoards}
              />
              <span
                className={'bp3-icon-standard bp3-icon-crown custom-icon'}
              />
            </>
          ) : props.boardRole === 'CREATE' ? (
            <span className={'bp3-icon-standard bp3-icon-plus'} />
          ) : props.boardRole === 'ADMIN' ? (
            <span className={'bp3-icon-standard bp3-icon-tag custom-icon'} />
          ) : (
            <span />
          )}
          <div
            onClick={
              props.addNewBoard
                ? () => props.addNewBoard()
                : () => props.openKanban()
            }
          >
            <p>{props.boardName}</p>
            <p className={'bp3-text-small bp3-text-muted'}>
              {props.createdBy ? `${props.createdBy}` : null}
            </p>
          </div>
        </Card>
      </>
    );
  }
}

export default BoardBox;
