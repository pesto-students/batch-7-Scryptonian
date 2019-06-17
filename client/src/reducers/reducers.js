import {
  UPDATE_AUTH,
  DISPLAY_ISSUE_MODAL,
  SET_SELECTED_ISSUE,
  CLOSE_ISSUE_MODAL,
  SET_KANBAN_DATA,
  REORDER_ISSUES,
} from '../actions/actionTypes';

export const initialState = {
  currentUserId: null,
  isAuthenticated: false,
  displayName: '',
  emailId: '',
  profileImgUrl: '',
  isIssueDetailModalVisible: false,
  selectedIssue: null,
  currentBoardName: null,
  currentBoardId: null,
  lifecycles: null,
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

  if (action.type === SET_KANBAN_DATA) {
    return {
      ...state,
      lifecycles: action.kanbanData.lifecycles,
      currentBoardName: action.kanbanData.boardName,
      currentBoardId: action.kanbanData.boardid,
    };
  }

  if (action.type === REORDER_ISSUES) {
    const newLifecyles = state.lifecycles.map(lifecycle => {
      if (lifecycle._id === action.updatedLifecycle._id) {
        return action.updatedLifecycle;
      }
      return lifecycle;
    });
    return {
      ...state,
      lifecycles: newLifecyles,
    };
  }

  return state;
};

export default reducer;
