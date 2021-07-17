import { UserContext } from 'App';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({children, ...rest}) => {
    const [ loggedInUser, setLoggedInUser] = useContext(UserContext)
    return ( 
        <Route
      {...rest}
      render={({ location }) =>
      (loggedInUser.email || sessionStorage.getItem('token') || sessionStorage.getItem('email')) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;