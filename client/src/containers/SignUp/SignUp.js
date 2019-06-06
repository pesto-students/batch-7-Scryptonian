import React from 'react';
import GoogleSignIn from './../../components/GoogleSignIn/GoogleSignIn';
import classes from './SignUp.module.css';

const SignUp = props => {
  const { isAuthenticated } = props;

  return (
    <div className={classes.SignUp}>
      <h1>Issue Tracker</h1>
      {isAuthenticated ? <p>Welcome</p> : <GoogleSignIn className={classes.GoogleButton} />}
    </div>
  );
};

export default SignUp;