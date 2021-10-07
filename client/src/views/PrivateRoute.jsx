import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux'

const RedirectRoute = ({component: Component, layout: Layout, ...rest}) => {
    const authUser = useSelector(state => state.auth.authUser);

    
    return <Route {...rest} render = { (props) => {
        return authUser._id ? (
                <Layout>
                    <Component {...props} {...rest} />
                </Layout>
            ) : <Redirect to="/login" />
        }
    }>
    </Route>
};


export default RedirectRoute;