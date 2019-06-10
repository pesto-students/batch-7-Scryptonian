import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../config/config';
import { connect } from 'react-redux';
import { updateAuthDetails } from '../../actions/actionTypes';
import queryString from 'query-string';

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    updateAuthDetails: userData => dispatch(updateAuthDetails(userData))
  };
};

export class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      boards: []
    };
  }

  async componentDidMount() {
    let response;
    const userDetails = queryString.parse(this.props.location.search);
    this.props.updateAuthDetails(userDetails);
    try {
      response = await axios.get(`${SERVER_URL}/boards`, {
        withCredentials: true
      });
      this.setState({ boards: response.data });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return this.state.boards.map(e => {
      console.log(e);
      return <li>{e.name}</li>;
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
