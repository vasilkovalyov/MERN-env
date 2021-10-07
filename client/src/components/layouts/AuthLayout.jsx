import React, { Fragment } from 'react'

import Layout from 'antd/es/layout'

const { Content } = Layout;

const MainLayout = (props) => {
    return (
        <Fragment>
            <Content className="main">
                {props.children}
            </Content>
        </Fragment>
    )
}

export default MainLayout