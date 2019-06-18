import React from 'react';
import UpvoteIcon from '../../assets/UpvoteIcon';
import classes from './Upvote.module.css';
import { Divider } from '@blueprintjs/core';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

export class Upvote extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpvoteOnClick = this.handleUpvoteOnClick.bind(this);
  }

  state = {
    upvotedState: this.props.upvoted,
    upvoteCount: this.props.upvotes,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.upvoted !== this.props.upvoted || nextProps.upvotes !== this.props.upvotes) {
      this.setState({ upvotedState: nextProps.upvoted, upvoteCount: nextProps.upvotes });
    }
  }

  changeUpvoteState = () => {
    const currentUpvoteState = this.state.upvotedState;
    const currentUpvoteCount = this.state.upvoteCount;
    let changeby;
    if (currentUpvoteState) {
      changeby = -1;
    } else {
      changeby = 1;
    }
    this.setState({
      upvotedState: !currentUpvoteState,
      upvoteCount: currentUpvoteCount + changeby,
    });
  };

  handleUpvoteOnClick = () => {
    this.changeUpvoteState();
    const { issueid } = this.props;
    const upvoteURL = `${BASE_URL}/issues/${issueid}/upvote`;
    axios(upvoteURL, {
      method: 'patch',
      withCredentials: true,
    })
      .then(res => {
        const { boardid, getDataForKanbanView, currentUserId } = this.props;
        getDataForKanbanView(boardid, currentUserId);
      })
      .catch(e => console.log(e)); // TODO: Show this error in a pop-up
  };

  render() {
    const upvoteComponentClass = this.state.upvotedState ? classes.upvoted : classes.didNotUpvote;
    const upvoteIcon = this.state.upvotedState ? <UpvoteIcon upvoted={true} /> : <UpvoteIcon />;
    return (
      <div className={upvoteComponentClass} onClick={this.handleUpvoteOnClick}>
        {upvoteIcon}
        {this.props.condensed ? null : (
          <>
            Upvote
            <Divider className={classes.divider} />
          </>
        )}
        <div className={classes.upvoteCount}>{this.state.upvoteCount}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boardid: state.currentBoardId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataForKanbanView: (boardid, userid) =>
      dispatch(actionCreators.getDataForKanbanView(boardid, userid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upvote);
