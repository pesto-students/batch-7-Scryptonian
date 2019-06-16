import { UPDATE_AUTH } from './actionTypes';

export function updateAuthDetails(payload) {
  return { type: UPDATE_AUTH, payload };
}
