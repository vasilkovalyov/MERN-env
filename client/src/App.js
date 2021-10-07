import React, { useEffect, useState } from 'react'
import './assets/styles/main.less'

import { useDispatch} from 'react-redux'
import actions from './redux/actions'

import { Spin } from 'antd'

import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
// pages  public
import { Home } from './views/main'
// pages auth
import { Login, Register, ResetPassword } from './views/auth'
// pages  admin
import { HomeAdmin, Account } from './views/admin'
// layouts
import { MainLayout, AuthLayout, Dashboard } from './components/layouts'
import AppRoute from './views/AppRoute.jsx'
import PrivateRoute from './views/PrivateRoute.jsx'

import routes from './constants/routes'
import jwtService from './common/jwt.service'
import authServices from './services/AuthServices'

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect( async () => {
        try {
            if (!jwtService.getToken()) return

            const response = await authServices.checkAuth()
            jwtService.setToken(response.accessToken);

            if(response.user) {
                dispatch(actions.login_user(response.user))
            }
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
        return () => {}
    }, []);

    return (
        <div id="wrapper">
            {
                loading ? (
                    <div className="app-loader d-flex d-flex--aligned-center d-flex--centered">
                        <Spin size="large" />
                    </div>
                ) : (
                    <Router>
                        <Switch>
                            <AppRoute exact path={routes.HOME} component={Home} layout={MainLayout} />
                            <AppRoute exact path={routes.LOGIN} component={Login} layout={AuthLayout} />
                            <AppRoute exact path={routes.REGISTER} component={Register} layout={AuthLayout} />
                            <AppRoute exact path={routes.RESET_PASSWORD} component={ResetPassword} layout={AuthLayout} />
                            <PrivateRoute exact path={routes.ADMIN} component={HomeAdmin} layout={Dashboard} />
                            <PrivateRoute path={routes.ACCOUNT.ACCOUNT_PAGE} component={Account} layout={Dashboard} />
                        </Switch>
                    </Router>
                )
            }
            
        </div>
    )
}

export default App