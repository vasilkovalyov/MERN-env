import React, { Fragment } from 'react'

import Layout from 'antd/es/layout'

import Header from '../public/Header.jsx'

const { Content } = Layout;

const MainLayout = (props) => {
    return (
        <Fragment>
            <Header />
            <Content className="main">
                {props.children}
            </Content>
        </Fragment>
    )
}

export default MainLayout