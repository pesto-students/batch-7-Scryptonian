import {
  UPDATE_AUTH,
  SET_SELECTED_ISSUE,
  DISPLAY_ISSUE_MODAL,
  CLOSE_ISSUE_MODAL,
  SET_KANBAN_DATA,
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

export function getDataForKanbanView(boardid) {
  return dispatch => {
    const getKanbanDataURL = `${BASE_URL}/boards/kanban`;
    axios
      .get(getKanbanDataURL, {
        params: { boardid },
      })
      .then(res => {
        dispatch(
          setKanbanDataToStore({
            lifecycles: res.data.lifecycles,
            boardName: res.data.name,
            boardid: res.data._id,
          }),
        );
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