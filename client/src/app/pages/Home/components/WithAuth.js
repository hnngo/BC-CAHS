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
  return class AuthenticatedComponent extends React.Component {
    state = {
      authenticated: undefined
    };

    async isAuthenticated() {
      var { data } = await apiGetAuthUser();

      if (data.auth) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    }

    /**
     * Render
     */
    render() {
      {
        this.isAuthenticated();
        if (this.state.authenticated) {
          return <WrappedComponent />;
        } else if (this.state.authenticated === false) {
          return <Navigate to="/login" replace />;
        } else {
          <p>Loading...</p>;
        }
      }
    }
  };
}

export default withAuth;
