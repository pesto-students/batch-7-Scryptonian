import {
  UPDATE_AUTH,
  SET_AUTHENTICATED,
  DISPLAY_ISSUE_MODAL,
  SET_SELECTED_ISSUE,
  CLOSE_ISSUE_MODAL,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  displayName: '',
  emailId: '',
  profileImgUrl: '',
  isIssueDetailModalVisible: false,
  selectedIssue: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === UPDATE_AUTH) {
    return {
      ...state,
      isAuthenticated: true,
      displayName: action.payload.name,
      emailId: action.payload.emailId,
      profileImgUrl: action.payload.imageUrl,
    };
  }

  if (action.type === DISPLAY_ISSUE_MODAL) {
    return {
      ...state,
      isIssueDetailModalVisible: true,
    };
  }
  if (action.type === SET_SELECTED_ISSUE) {
    return {
      ...state,
      selectedIssue: action.issue,
    };
  }
  if (action.type === CLOSE_ISSUE_MODAL) {
    return {
      ...state,
      selectedIssue: null,
      isIssueDetailModalVisible: false,
    };
  }

  return state;
};

export default reducer;
