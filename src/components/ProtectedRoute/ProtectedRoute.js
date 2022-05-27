import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  componentHeader: Header,
  componentFooter: Footer,
  ...props
}) => {
  return (
    <Route>
      {() => {
        const main = props.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to='./sign-in' />
        );
        return (
          <>
            <Header
              headerText={props.headerText}
              userEmail={props.userEmail}
              handleLogin={props.handleLogin}
            />
            {main}
            <Footer />
          </>
        );
      }}
    </Route>
  );
};

export default ProtectedRoute;
