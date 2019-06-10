export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const UPDATE_AUTH = 'UPDATE_AUTH';

export function updateAuthDetails(payload) {
  console.log('payload', payload);
  return { type: UPDATE_AUTH, payload };
}

export function addTitle(payload) {
  return { type: 'ADD ARTICLE', payload };
}
