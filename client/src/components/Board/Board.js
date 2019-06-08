import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../config/config';

export class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      boards: []
    };
  }
  componentDidMount() {
    axios
      .get(`${SERVER_URL}/boards`, {
        withCredentials: true
      })
      .then(res => {
        console.log('res');
        this.setState({ boards: res.data });
      })
      .catch(e => console.log(e));
  }
  render() {
    return this.state.boards.map(e => {
      console.log(e);
      return <li>{e.name}</li>;
    });
  }
}

export default Board;
