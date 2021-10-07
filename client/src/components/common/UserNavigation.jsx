import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import actions from '../../redux/actions'

import { DownOutlined } from '@ant-design/icons';

import Menu from 'antd/es/menu'
import Typography from 'antd/es/typography'
import Avatar from 'antd/es/avatar'
import Dropdown from 'antd/es/dropdown'

import colors from '../../constants/colors'

import jwtService from '../../common/jwt.service'
import authServices from '../../services/AuthServices'

const { Text } = Typography

const UserNavigation = ({ navigation, userAvatar, userName, userInitials }) => {
    const dispatch = useDispatch();

    const logOut = async (e) => {
        e.preventDefault();
        try {
            await authServices.logout()
            .then(response => {
                jwtService.removeToken();
                jwtService.removeRefreshToken();
                dispatch(actions.logout_user());
            })
        } catch(e) {
            console.log(e);
        }
    }

    const dropdownMenu = (
        <Menu>
            {
                navigation && navigation.map((item, index) => {
                    return (
                        <Menu.Item key={index}>
                            <NavLink to={item.path}>{item.name}</NavLink>
                        </Menu.Item>
                    )
                })
            }
            <Menu.Divider />
            <Menu.Item key="10">
                <span onClick={(e) => logOut(e)}>Logout</span>
            </Menu.Item>
        </Menu>
    );

    return <Dropdown overlay={dropdownMenu} trigger={['click']} overlayClassName="header__dropdown" placement="bottomRight" arrow>
            <Link to="#">
                <Text className="semibold">{userName}</Text>
                {
                    userAvatar.url ? (
                        <div className="ant-avatar header__avatar ml-2">
                            <img src={userAvatar.url} alt={userName} />
                        </div>
                    ) : (
                        <Avatar
                            size="middle"
                            className="header__avatar ml-2"
                            style={{ backgroundColor: colors.PRIMARY }}
                            onClick={e => e.preventDefault()}
                        >{userInitials}</Avatar>
                    )
                }
                <DownOutlined />
            </Link>
        </Dropdown>
}

export default UserNavigation