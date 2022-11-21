import React from "react";
import { Navigate } from "react-router-dom";

// API
import { apiGetAuthUser } from "../../../api/user";

/**
 * A HOC that protects components from being accessed by unauthenticated users.
 *
 * @param {*} WrappedComponent a protected component only accessible if user is logged in
 * @returns either protected component, if user is authenticated, else redirects to login
 */
function withAuth(WrappedComponent) {
  const AuthenticatedComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(undefined);
  
    const getCurrentUser = async () => {
      var { error, data } = await apiGetAuthUser();

      if (!error && data.auth) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }

    React.useEffect(() => {
      getCurrentUser();
    }, [])

    if (isAuthenticated) {
      return <WrappedComponent />;
    } else if (isAuthenticated === false) {
      return <Navigate to="/login" replace />;
    } else {
      return <p>Loading...</p>;
    }
  };

  return AuthenticatedComponent;
}

export default withAuth;
