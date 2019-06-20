import React from 'react';
import GoogleSignInButton from './../../assets/google-button/btn_google_signin.png';
import { GoogleLoginUrl } from '../../config';
import { errorToast } from '../Toast/Toast';

const GoogleSignIn = () => {
  if (!GoogleLoginUrl) {
    errorToast('Google Login URL is not available in env.')
  }
  return (
  <img
    role="button"
    src={GoogleSignInButton}
    alt="Google Sign In"
    height="50px"
    onClick={() => (window.location.href = GoogleLoginUrl)}
  />
)};
export default GoogleSignIn;
