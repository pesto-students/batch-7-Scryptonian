import React from 'react';
import GoogleSignIn from './../../components/GoogleSignIn/GoogleSignIn';
import classes from './SignUp.module.css';
import { Button, Card, Elevation } from '@blueprintjs/core';

const SignUp = props => {
  const { isAuthenticated } = props;

  return (
    <div className={classes.SignUp}>
      <Card interactive={false} elevation={Elevation.TWO}>
        <h5>
          <a href="#">Card heading</a>
        </h5>
        <p>Card content</p>
        <Button>Submit</Button>
      </Card>

      <h1>Issue Tracker</h1>
      {isAuthenticated ? (
        <p>Welcome</p>
      ) : (
        <GoogleSignIn className={classes.GoogleButton} />
      )}
    </div>
  );
};

export default SignUp;
