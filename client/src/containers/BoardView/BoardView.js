import React from 'react';
import { connect } from 'react-redux';
import { updateAuthDetails } from '../../actions/actionDispatchers';
import queryString from 'query-string';

const mapDispatchToProps = dispatch => {
  return {
    updateAuthDetails: userData => dispatch(updateAuthDetails(userData))
  };
};

class BoardView extends React.Component {
  constructor() {
    super();
    this.state = {
      boards: []
    };
  }

  async componentDidMount() {
    const userDetails = queryString.parse(this.props.location.search);
    this.props.updateAuthDetails(userDetails);
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  mapDispatchToProps
)(BoardView);
