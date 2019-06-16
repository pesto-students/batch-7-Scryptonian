import { UPDATE_AUTH } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  displayName: '',
  emailId: '',
  profileImgUrl: '',
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

  return state;
};

export default reducer;
