import React from 'react';
import GoogleSignIn from './../../components/GoogleSignIn/GoogleSignIn';
import classes from './SignUp.module.css';
import { Button, Card, Elevation } from '@blueprintjs/core';

const SignUp = props => {
  const { isAuthenticated } = props;

  return (
    <div className={classes.SignUp}>
      <div class={classes.flexContainer}>
        <div>
          <div className="logoFull">
            <h3>
              Welcome to{'  '}
              <span
                style={{
                  marginRight: '10px',
                  color: 'cornflowerblue',
                  fontSize: '20px'
                }}
                className="bp3-icon bp3-icon-standard  bp3-icon-search-around"
              />
              Scrypt<span style={{ fontWeight: '100' }}>onian</span>
            </h3>
          </div>
          <h3>
            Scryptonian lets you work more collaboratively and get more done.
          </h3>
          <ul style={{ paddingBottom: '20px' }}>
            <li>
              Scryptonian’s boards, lists, and cards enable you to organize and
              prioritize your projects in a fun, flexible, and rewarding way.
            </li>
          </ul>
          {isAuthenticated ? (
            <p>Welcome</p>
          ) : (
            <GoogleSignIn className={classes.GoogleButton} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
