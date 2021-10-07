import React, { Fragment, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Layout from 'antd/es/layout'
import Typography from 'antd/es/typography'
import Menu from 'antd/es/menu'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Divider from 'antd/es/divider'
import Button from 'antd/es/button'
import Space from 'antd/es/space'

import Image from '../common/Image.jsx'
import UserNavigation from '../common/UserNavigation.jsx'

import routes from '../../constants/routes'

const { Header } = Layout;
const { Text, Title } = Typography

const navigation = [
    {
        path: routes.ADMIN,
        name: 'Admin'
    },
    {
        path: routes.ACCOUNT.ACCOUNT_PAGE,
        name: 'View Profile'
    }
]

const getNavigation = (HeaderNavigation) => {
    return (
        <Menu className="d-flex d-flex--ended d-flex--center header__menu" theme="light">
            {
                HeaderNavigation && HeaderNavigation.map((item, index) => {
                    return (
                        <Menu.Item key={index}>
                            <NavLink to={item.Path}>{item.Name}</NavLink>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    )
}

const HeaderPublic = () => {
    const user = useSelector(state => state.auth.authUser);
    const dispatch = useDispatch();
    const [authUser, setAuthUser] = useState(null);
    
    useEffect(async () => {
        await setAuthUser(user)
    }, [user])

    const HeaderLogo = {
        name: 'MERN App Logo',
        url: 'https://i.postimg.cc/ZRv35qXj/logo.png'
    }

    return <Header className="header">
        <div className="container">
            <Row gutter={30} justify="space-between" align="middle">
                <Col xs={4}>
                    <Link to={routes.HOME} className="header__logo-link d-inline-block">
                        {/* <Image className="header__logo" image={HeaderLogo} /> */}
                        <Title level={4} className="header__logo">MERN App</Title>
                    </Link>
                </Col>
                <Col md={8}>
                    <nav className="header__navigation">
                        <Divider className="header__devider" type="vertical" />
                        <Space className="header__additional-nav">
                            {
                                authUser && authUser._id ? null : (
                                    <Fragment>
                                        <Button>
                                            <Link to={routes.LOGIN}>Login</Link>
                                        </Button>
                                        <Button>
                                            <Link to={routes.REGISTER}>Register</Link>
                                        </Button>
                                    </Fragment>
                                )
                            }
                            {
                                authUser && authUser._id && (
                                    <UserNavigation 
                                        navigation={navigation}
                                        userAvatar={authUser.image}
                                        userName={authUser.name}
                                        userInitials={authUser.initials}
                                    />
                                )
                            }
                        </Space>
                    </nav>
                </Col>
            </Row>
        </div>
    </Header>
}

export default HeaderPublic