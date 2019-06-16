import reducer, { initialState } from './reducers';
import * as actionTypes from '../actions/actionTypes';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_AUTH', () => {
    const userDetails = {
      name: 'Amit Badala',
      emailId: 'amitbadala07@gmail.com',
      imageUrl:
        'https://lh5.googleusercontent.com/-Mzff2L4Awnw/AAAAAAAAAAI/AAAAAAAAADY/IIDwANrAIn8/photo.jpg',
    };
    expect(
      reducer(({} = initialState), {
        type: actionTypes.UPDATE_AUTH,
        payload: userDetails,
      }),
    ).toEqual({
      currentUserId: null,
      isAuthenticated: true,
      displayName: 'Amit Badala',
      emailId: 'amitbadala07@gmail.com',
      isIssueDetailModalVisible: false,
      profileImgUrl:
        'https://lh5.googleusercontent.com/-Mzff2L4Awnw/AAAAAAAAAAI/AAAAAAAAADY/IIDwANrAIn8/photo.jpg',
      selectedIssue: null,
      currentBoardName: null,
      currentBoardId: null,
      lifecycles: null,
    });
  });
});
