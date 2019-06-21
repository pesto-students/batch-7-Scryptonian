import React from 'react';
import './ViewLabels.css';
import {
  Popover,
  Menu,
  Classes,
  Button,
  MenuItem,
  Intent
} from '@blueprintjs/core';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { connect } from 'react-redux';
import { errorToast } from '../Toast/Toast';

class ViewLabels extends React.Component {
  state = {
    names: [],
    colors: []
  };

  getAllContent = async () => {
    let result;
    let color = [],
      name = [];
    const boardId = this.props.currentBoardId;
    try {
      result = await axios.get(`${BASE_URL}/boards/${boardId}/label/`);
    } catch (e) {
      errorToast(e.message);
    }

    result.data.map((res, index) => {
      color[index] = res.color;
      name[index] = res.labelName;
    });
    this.setState({ colors: color, names: name });
  };

  render() {
    return (
      <Popover
        content={
          <Menu
            className={[Classes.ELEVATION_1, 'customViewLabel']}
            style={{ display: 'block', overflow: 'scroll' }}
          >
            {this.state.names.map((name, index) => (
              <MenuItem
                key={index}
                style={{
                  background: this.state.colors[index],
                  margin: '9px'
                }}
                text={name}
              />
            ))}
          </Menu>
        }
      >
        <Button
          icon="tag"
          onClick={this.getAllContent}
          text="View Labels"
          small={true}
          intent={Intent.NONE}
        />
      </Popover>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentBoardId: state.currentBoardId
  };
};

export default connect(mapStateToProps)(ViewLabels);
