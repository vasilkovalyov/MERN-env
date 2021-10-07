import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'antd/es/avatar'
import Space from 'antd/es/space'
import Typography from 'antd/es/typography'

import userInfoModel from '../../models/UserInfo'
import colors from '../../constants/colors'

const { Paragraph, Title, Text } = Typography

const UserInfo = (user) => {
    return (
        <Space direction="horizontal" align="top">
            <Avatar
                className="banner__avatar"
                size="middle"
                style={{ backgroundColor: colors.PRIMARY }}
            >{user.initials && user.initials}</Avatar>
            <Paragraph className="ta-l banner-post__content">
                <Title level={5} className="mb-0 banner-post__user">{user.fullName && user.fullName}</Title>
                <Text className="banner-post__date">{user.timestamp && user.timestamp}</Text>
            </Paragraph>
        </Space>
    )
}

UserInfo.propTypes = {
    User: PropTypes.shape(userInfoModel),
}

export default UserInfo