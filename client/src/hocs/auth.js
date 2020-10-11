
import {useDispatch, useSelector} from "react-redux"
import React, {useEffect} from "react";
import {auth} from "../_actions/user_actions";

export default function (SpecificComponent, option, adminRoute=null) {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user)
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