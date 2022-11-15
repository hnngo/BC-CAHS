import React from "react";
import { Navigate } from "react-router-dom";

// Utils
import axios from "axios";

function withAuth(WrappedComponent) {

    return class AuthenticatedComponent extends React.Component {

        state = {
            authenticated: undefined,
        }

        async isAuthenticated() {
            var session = await axios.get("http://localhost:8000/api/auth/authUser", {
                withCredentials: true
            })
        
            if (session.data.data.auth) {
                this.setState({authenticated: true})
            } else {
                this.setState({authenticated:false})
        }
    }

    /**
     * Render
     */
    render() {
            {     
                this.isAuthenticated();
                if (this.state.authenticated) {
                    return <WrappedComponent/>
                }  else if (this.state.authenticated === false) {
                    return <Navigate to="/login" replace/>
                } else {
                    <p>Loading...</p>
                }
            }            
    }
}
}

export default withAuth;