import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { errorToast } from '../Toast/Toast';
import { BASE_URL } from '../../config';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

class Multiselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      labelList: []
    };
  }

  componentDidMount = () => {
    this.getLabelList();
  };

  getLabelList = async () => {
    let result;
    let color = [],
      name = [];
    const boardId = this.props.currentBoardId;
    try {
      result = await axios.get(`${BASE_URL}/boards/${boardId}/label/`);
      if (result.data) {
        let labelList = result.data.map(el => {
          return { value: el._id, name: el.labelName };
        });
        this.setState({ labelList: labelList });
        console.log(this.state.labelList);
      }
    } catch (e) {
      errorToast(e.message);
    }
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.labelList}
        isMulti={true}
        className="bp3-input"
      />
    );
  }
}

export default Multiselect;
