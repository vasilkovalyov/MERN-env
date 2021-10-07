import React, { Fragment } from 'react'

import Layout from 'antd/es/layout'

import AdminHeader from '../../components/admin/AdminHeader.jsx'

const { Content } = Layout;

const Dashboard = (props) => {
    return (
        <Fragment>
            <AdminHeader />
            <Content className="main">
                {props.children}
            </Content>
        </Fragment>
    )
}

export default Dashboard