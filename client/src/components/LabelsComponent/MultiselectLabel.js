import React from 'react';
import Select from 'react-select';
import axios from '../../axios';
import { BASE_URL } from '../../config';
import { successToast, errorToast } from '../Toast/Toast';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

class Multiselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      labelList: [],
    };
  }

  componentDidMount = () => {
    this.getLabelList();
  };

  getLabelList = async () => {
    let result;
    const boardId = this.props.currentBoardId;
    try {
      result = await axios.get(`${BASE_URL}/boards/${boardId}/label/`);
      if (result.data) {
        let labelList = result.data.map(el => {
          return { value: el._id, label: el.labelName };
        });
        this.setState({ labelList: labelList });
      }
    } catch (e) {
      errorToast(e.message);
    }
  };

  handleChange = selectedOption => {
    const issueid = this.props.issue;
    const { showIssueDetails, getDataForKanbanView, currentBoardId, currentUserId } = this.props;
    this.setState({ selectedOption });
    const allLabels = selectedOption.map(option => option.value);
    console.log(allLabels);
    const setLabelURL = `${BASE_URL}/issues/${issueid}/label`;
    axios(setLabelURL, {
      method: 'patch',
      data: {
        allLabels: allLabels,
      },
    })
      .then(res => {
        successToast('Assigned succesfully.');
        showIssueDetails(res.data._id);
        getDataForKanbanView(currentBoardId, currentUserId);
      })
      .catch(e => errorToast(e.message));
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <>
        <div className="content">
          <span style={{ fontWeight: '600' }}>Set labels: </span>
        </div>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.labelList}
          isMulti={true}
          className={'bp3-input-group'}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedIssue: state.selectedIssue,
    currentUserId: state.currentUserId,
    currentBoardId: state.currentBoardId,
    members: state.boardMemberList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actionCreators.closeIssueDetailsModal()),
    showIssueDetails: issueid => dispatch(actionCreators.showIssueDetails(issueid)),
    getDataForKanbanView: (boardid, userid) =>
      dispatch(actionCreators.getDataForKanbanView(boardid, userid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Multiselect);
