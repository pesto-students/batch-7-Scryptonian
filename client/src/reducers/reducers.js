import { SET_AUTHENTICATED } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === SET_AUTHENTICATED) {
    return {
      ...state,
      isAuthenticated: true,
    };
  }
  return state;
};

export default reducer;
