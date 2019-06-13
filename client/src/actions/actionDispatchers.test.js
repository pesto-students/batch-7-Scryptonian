import * as actionTypes from './actionTypes';
import * as actions from './actionDispatchers';

describe('actions', () => {
  it('should create an action update auth details', () => {
    const userDetails = {
      name: 'Amit Badala',
      emailId: 'amitbadala07@gmail.com',
      imageUrl:
        'https://lh5.googleusercontent.com/-Mzff2L4Awnw/AAAAAAAAAAI/AAAAAAAAADY/IIDwANrAIn8/photo.jpg'
    };
    const expectedAction = {
      type: actionTypes.UPDATE_AUTH,
      payload: userDetails
    };
    expect(actions.updateAuthDetails(userDetails)).toEqual(expectedAction);
  });
});
