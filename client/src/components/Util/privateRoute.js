import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const checkAuthentication = () => {};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        checkAuthentication.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
