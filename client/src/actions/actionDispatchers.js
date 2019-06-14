import {
  UPDATE_AUTH,
  SET_SELECTED_ISSUE,
  DISPLAY_ISSUE_MODAL,
  CLOSE_ISSUE_MODAL,
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
