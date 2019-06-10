import React from 'react';
import GoogleSignInButton from './../../assets/google-button/btn_google_signin.png';

const GoogleSignIn = () => (
  <img
    onClick={() => (window.location.href = 'http://localhost:8000/auth/google')}
    role="button"
    src={GoogleSignInButton}
    alt="Google Sign In"
    height="50px"
  />
);
export default GoogleSignIn;
