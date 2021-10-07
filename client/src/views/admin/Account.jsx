import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import {
    Switch,
    Route
} from "react-router-dom"

import { Profile, CloseAccount, ChangePassword } from './profile'

import Menu from 'antd/es/menu'
import Layout from 'antd/es/layout'
import Typography from 'antd/es/typography'
import Row from 'antd/es/row'
import Col from 'antd/es/col'

import routes from '../../constants/routes'

const { Sider, Content } = Layout;
const { Title } = Typography

const accountSettingsRoutes = [
    {
        path: routes.ACCOUNT.ACCOUNT_PAGE,
        name: 'Edit profile'
    },
    {
        path: routes.ACCOUNT.CHANGE_PASSWORD,
        name: 'Change password'
    },
    {
        path: routes.ACCOUNT.CLOSE_ACCOUNT,
        name: 'Close account'
    }
]

const Account = () => {    
    return (
        <Layout className="section-profile">
            <div className="container">
                <Row gutter={30}>
                    <Col xs={24} md={6}>
                        <Sider theme='light' className="section-profile__aside" width="100%">
                            <Title level={5}>Account settings</Title>
                            <Menu className="account-settings-list">
                                {
                                    accountSettingsRoutes && accountSettingsRoutes.map((item, index) => {
                                        return (
                                            <Menu.Item key={index}>
                                                <NavLink to={item.path}>{item.name}</NavLink>
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </Menu>
                        </Sider>
                    </Col>
                    <Col xs={24} md={18}>
                        <Content className="section-profile__content">
                            <Switch>
                                <Route exact path={routes.ACCOUNT.ACCOUNT_PAGE} component={Profile} />
                                <Route exact path={routes.ACCOUNT.CLOSE_ACCOUNT} component={CloseAccount} />
                                <Route exact path={routes.ACCOUNT.CHANGE_PASSWORD} component={ChangePassword} />
                            </Switch>
                        </Content>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}

export default Account