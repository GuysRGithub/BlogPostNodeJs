
import React, {useEffect} from "react";
import {useDispatch} from "react-redux"
import {auth} from "../_actions/user_actions";

// null   Anyone Can go inside
// true   only logged in user can go inside
// false  logged in user can't go inside
export default function (SpecificComponent, option, adminRoute=null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(auth()).then(response => {
                // Not Login
                if (!response.payload.isAuthenticated) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    // Admin page but not admin user
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push("/")
                    }

                    // Logged in but go to login page
                    else {
                        if (option === false) {
                            props.history.push("/")
                        }
                    }
                }
            })
        }, [])

        return <SpecificComponent {...props} />
    }

    return AuthenticationCheck
}