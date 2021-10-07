import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'

import Layout from 'antd/es/layout'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Divider from 'antd/es/divider'
import Typography from 'antd/es/typography'

import UserNavigation from '../../components/common/UserNavigation.jsx'

import routes from '../../constants/routes'

const { Header } = Layout;
const { Title } = Typography

const navigation = [
    {
        path: routes.HOME,
        name: 'Home'
    },
    {
        path: routes.ACCOUNT.ACCOUNT_PAGE,
        name: 'View Profile'
    }
]

const AdminHeader = () => {
    const authUser = useSelector(state => state.auth.authUser);
    const dispatch = useDispatch();
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        setAvatarUrl(authUser.image.url);
    }, [])

    return <Header className="header header--admin">
        <div className="container">
            <Row gutter={30} justify="space-between" align="middle">
                <Col xs={4}>
                    <Title level={4} className="header__logo">Admin</Title>
                </Col>
                <Col md={12}>
                    <nav className="header__navigation">
                        <Divider className="header__devider" type="vertical" />
                        {
                            authUser && (
                                <UserNavigation 
                                    navigation={navigation}
                                    userAvatar={authUser.image}
                                    userName={authUser.name}
                                    userInitials={authUser.initials}
                                />
                            )
                        }
                    </nav>
                </Col>
            </Row>
        </div>
    </Header>
}

export default AdminHeader