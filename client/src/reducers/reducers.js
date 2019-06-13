import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  displayName: '',
  emailId: '',
  profileImgUrl: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_AUTH: {
      return {
        ...state,
        isAuthenticated: true,
        displayName: action.payload.name,
        emailId: action.payload.emailId,
        profileImgUrl: action.payload.imageUrl
      };
    }
  }
  return state;
};

export default reducer;
