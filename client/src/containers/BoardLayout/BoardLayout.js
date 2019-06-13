import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import Box from '../../components/Board/BoardBox';
import { connect } from 'react-redux';
import { updateAuthDetails } from '../../actions/actionDispatchers';
import queryString from 'query-string';
import CreateBoardModal from '../../components/CreateBoardModal/CreateBoardModal';
import '../BoardLayout/BoardLayout.css';

const mapDispatchToProps = dispatch => {
  return {
    updateAuthDetails: userData => dispatch(updateAuthDetails(userData))
  };
};

export class BoardLayout extends React.Component {
  state = {
    boards: [],
    openModal: false
  };
  componentDidMount() {
    if (this.props.location) {
      const userDetails = queryString.parse(this.props.location.search);
      if (userDetails) {
        this.props.updateAuthDetails(userDetails);
      }
    }
    this.getAllBoards();
  }

  getAllBoards = async () => {
    let boards;
    try {
      boards = await axios.get(`${BASE_URL}/boards`);
      if (boards) {
        this.setState({ boards: boards.data });
      }
    } catch (e) {
      console.log('Something went wrong');
    }
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    return (
      <>
        <CreateBoardModal
          onClose={this.closeModal}
          isOpen={this.state.openModal}
          updateBoard={this.getAllBoards}
        />
        <div className="BoardList">
          {this.state.boards.map((ele, index) => {
            return <Box key={index} boardName={ele.name} />;
          })}
          <Box boardName={'Create New'} addNewBoard={this.openModal} />
        </div>
      </>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(BoardLayout);
