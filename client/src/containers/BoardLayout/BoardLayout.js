import React from 'react';
import axios from '../../axios';
import { BASE_URL } from '../../config';
import Box from '../../components/Board/BoardBox';
import { connect } from 'react-redux';
import {
  updateAuthDetails,
  unsetBoardName
} from '../../actions/actionDispatchers';
import queryString from 'query-string';
import CreateBoardModal from '../../components/CreateBoardModal/CreateBoardModal';
import '../BoardLayout/BoardLayout.css';
import Cookies from 'js-cookie';

const mapDispatchToProps = dispatch => {
  return {
    updateAuthDetails: userData => dispatch(updateAuthDetails(userData)),
    unsetBoardName: () => dispatch(unsetBoardName())
  };
};

export class BoardLayout extends React.Component {
  state = {
    boards: [],
    openModal: false
  };

  componentDidMount() {
    this.props.unsetBoardName();
    if (this.props.location) {
      const userDetails = queryString.parse(this.props.location.search);
      if (userDetails) {
        Cookies.set('user-info', userDetails);
        const token = userDetails.token.toString();
        localStorage.setItem('Auth-Token', token);
        this.props.updateAuthDetails(userDetails);
        this.getAllBoards();
      }
    }
  }

  getAllBoards = async () => {
    let boards;
    try {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem(
        'Auth-Token'
      );
      boards = await axios.get(`${BASE_URL}/boards`);
      if (boards) {
        console.log(boards);
        this.setState({ boards: boards.data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  routeChange = boardId => {
    let path = `/board/${boardId}`;
    this.props.history.push(path);
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
        <h2 style={{ padding: '0 30px' }}>Boards List</h2>
        <hr />
        <div className="BoardList">
          {this.state.boards.map((board, index) => {
            return (
              <Box
                key={index}
                boardName={board.name}
                boardRole={board.members[0].role}
                createdBy={board.createdBy.name || null}
                openKanban={() => this.routeChange(board._id)}
              />
            );
          })}
          <Box
            boardName={'Create New'}
            addNewBoard={this.openModal}
            boardRole={'CREATE'}
          />
        </div>
      </>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(BoardLayout);
