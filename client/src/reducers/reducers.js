import { SET_AUTHENTICATED } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  displayName: '',
  emailId: '',
  profileImgUrl: ''
};

const reducer = (state = initialState, action) => {
  console.log('reducer', action);
  switch (action.type) {
    case 'UPDATE_AUTH': {
      return {
        ...state,
        isAuthenticated: true,
        displayName: action.payload.name,
        emailId: action.payload.emailId,
        profileImgUrl: action.payload.imageUrl
      };
    }
  }
  // if (action.type === SET_AUTHENTICATED) {
  //   return {
  //     ...state,
  //     isAuthenticated: true
  //   };
  // }
  return state;
};

export default reducer;
