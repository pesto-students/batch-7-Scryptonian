import {
  UPDATE_AUTH,
  DISPLAY_ISSUE_MODAL,
  SET_SELECTED_ISSUE,
  CLOSE_ISSUE_MODAL,
  SET_KANBAN_DATA,
  REORDER_ISSUES,
  TOGGLE_MEMBER_LIST_MODAL,
  TOGGLE_INVITE_USER_MODAL,
  UNSET_BOARD_NAME,
} from '../actions/actionTypes';
import { ROLE } from '../config';

export const initialState = {
  currentUserId: null,
  isAuthenticated: false,
  displayName: '',
  emailId: '',
  profileImgUrl: '',
  isIssueDetailModalVisible: false,
  isMemberListModalVisible: false,
  isInviteUserModalVisible: false,
  selectedIssue: null,
  currentBoardName: null,
  currentBoardId: null,
  lifecycles: null,
  roleInCurrentBoard: ROLE.USER,
  boardMemberList: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === UPDATE_AUTH) {
    return {
      ...state,
      isAuthenticated: true,
      displayName: action.payload.name,
      emailId: action.payload.emailId,
      profileImgUrl: action.payload.imageUrl,
      currentUserId: action.payload.userId,
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

  if (action.type === UNSET_BOARD_NAME) {
    return {
      ...state,
      currentBoardName: null,
    };
  }

  if (action.type === SET_KANBAN_DATA) {
    const newState = {
      ...state,
      lifecycles: action.kanbanData.lifecycles,
      currentBoardName: action.kanbanData.boardName,
      currentBoardId: action.kanbanData.boardid,
      boardMemberList: action.kanbanData.members,
    };

    if (action.kanbanData.userRole) {
      newState.roleInCurrentBoard = action.kanbanData.userRole;
    }

    return newState;
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

  if (action.type === TOGGLE_MEMBER_LIST_MODAL) {
    return {
      ...state,
      isMemberListModalVisible: !state.isMemberListModalVisible,
    };
  }

  if (action.type === TOGGLE_INVITE_USER_MODAL) {
    return {
      ...state,
      isInviteUserModalVisible: !state.isInviteUserModalVisible,
    };
  }

  return state;
};

export default reducer;
