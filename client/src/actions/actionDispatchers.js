import { UPDATE_AUTH } from './actionTypes';

export function updateAuthDetails(payload) {
  console.log('payload', payload);
  return { type: UPDATE_AUTH, payload };
}
