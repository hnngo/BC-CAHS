import React, { useEffect, useState } from "react";

// Utils
import axios from "axios";

import ErrorMessage from "./ErrorMessage";

function withAuth(WrappedComponent) {

    return class AuthenticatedComponent extends React.Component {

        state = {
            authenticated: undefined,
        }

        async isAuthenticated() {
            var session = await axios.get("http://localhost:8000/api/auth/authUser", {
                withCredentials: true
            })
        
            console.log(session.data.data.auth);

            if (session.data.data.auth) {
                console.log("in here")
                this.setState({authenticated: true})
            } else {
                console.log("out here")
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
                    return <ErrorMessage msg={"Please Login"}/>
                } else {
                    <p>Loading...</p>
                }
            }





                {/* {this.isAuthenticated() == "true" ? <WrappedComponent/> : <ErrorMessage msg={"Please Login"} /> } */}
                {/* {this.state.auth == true ? console.log("true baby") : console.log("false guyyy") } */}
            
    }
}
}

export default withAuth;