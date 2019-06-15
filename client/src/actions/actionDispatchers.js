import {
  UPDATE_AUTH,
  SET_SELECTED_ISSUE,
  DISPLAY_ISSUE_MODAL,
  CLOSE_ISSUE_MODAL,
  SET_KANBAN_DATA,
  REORDER_ISSUES,
  TOGGLE_MEMBER_LIST_MODAL,
} from './actionTypes';
import { BASE_URL } from '../config';
import axios from 'axios';

export function showIssueDetails(issueid) {
  return dispatch => {
    dispatch(displayIssueModal());
    const getIssueURL = `${BASE_URL}/issues/${issueid}`;
    axios
      .get(getIssueURL)
      .then(res => dispatch(setSelectedIssue(res.data)))
      .catch(e => console.log(e)); // TODO: Show a pop-up to notify the user
  };
}

export function displayIssueModal() {
  return { type: DISPLAY_ISSUE_MODAL };
}

export function setSelectedIssue(issue) {
  return { type: SET_SELECTED_ISSUE, issue };
}

export function closeIssueDetailsModal() {
  return { type: CLOSE_ISSUE_MODAL };
}

export function getDataForKanbanView(boardid, userid) {
  return dispatch => {
    const getKanbanDataURL = `${BASE_URL}/boards/kanban`;
    axios
      .get(getKanbanDataURL, {
        params: { boardid },
      })
      .then(res => {
        const kanbanData = {
          lifecycles: res.data.lifecycles,
          boardName: res.data.name,
          boardid: res.data._id,
          members: res.data.members,
        };

        if (userid) {
          const memberList = res.data.members;
          const currentUser = memberList.find(member => member.member === userid);
          if (!currentUser) {
            console.error('You are not part of this board.'); // TODO: Show this in a pop up
            return;
          }
          kanbanData.userRole = currentUser.role;
        }
        dispatch(setKanbanDataToStore(kanbanData));
      })
      .catch(e => {}); // TODO: Show a pop-up to notify the user
  };
}

export function setKanbanDataToStore(kanbanData) {
  return { type: SET_KANBAN_DATA, kanbanData };
}

export function updateAuthDetails(payload) {
  return { type: UPDATE_AUTH, payload };
}

export function reorderIssues(updatedLifecycle) {
  return { type: REORDER_ISSUES, updatedLifecycle };
}

export function updateLifecyclesInBackend(originalLifecycles, updatedLifecycles) {
  return dispatch => {
    const updateLifecycleURL = `${BASE_URL}/issues/reorder`;
    axios(updateLifecycleURL, {
      method: 'patch',
      data: {
        lifecycles: updatedLifecycles,
      },
      withCredentials: true,
    })
      .then()
      .catch(e => {
        originalLifecycles.map(lifecycle => {
          return dispatch(reorderIssues(lifecycle));
        });
        console.log(`Unable to move issue. ${e}`); // TODO: Show this error in pop-up
      });
  };
}

export function updateLifecycles(originalLifecycles, updatedLifecycles) {
  return dispatch => {
    updatedLifecycles.map(lifecycle => {
      return dispatch(reorderIssues(lifecycle));
    });
    dispatch(updateLifecyclesInBackend(originalLifecycles, updatedLifecycles));
  };
}

export function toggleMemberListModal() {
  return { type: TOGGLE_MEMBER_LIST_MODAL };
}
