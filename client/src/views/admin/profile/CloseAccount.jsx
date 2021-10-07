import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions'

import { useHistory } from 'react-router-dom'

import Typography from 'antd/es/typography'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Form from 'antd/es/form/'
import Input from 'antd/es/input/'
import Button from 'antd/es/button/'
import Spin from 'antd/es/spin'

import { showAlert } from '../../../shared/utils'
import jwtService from '../../../common/jwt.service'
import authServices from '../../../services/AuthServices'

import routes from '../../../constants/routes'

const { Title, Paragraph, Text } = Typography

const CloseAccount = () => {
    const history = useHistory();
    const authUser = useSelector(state => state.auth.authUser);
    const dispatch = useDispatch();

    const [loadingSubmit, setLoadingSubmit ] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async ({ password }) => {
        setLoadingSubmit(true);
        try {
            const response = await authServices.deleteAccount(authUser._id, password);
            jwtService.removeToken();
            jwtService.removeRefreshToken();
            dispatch(actions.logout_user());
            history.push(routes.HOME);
        } catch(e) {
            showAlert('error', e.response.data.message);
            setLoadingSubmit(false);
        } finally {
            setLoadingSubmit(false);
        }
    };

    useEffect(() => {
        return () => {
            setLoadingSubmit(null)
        }
    }, [])

    return (
        <div className="profile-info">
            <Title level={5}>Close account</Title>
            
            <Form
                name="close-account-form"
                className="auth-form"
                onFinish={onFinish}
                form={form}
            >
                <Row>
                    <Col sm={24}>
                        <Paragraph>
                            <Text> <span className="text-danger font-weight-semibold"> Warning: </span> closing your account is irreversible. It deletes all of your photos, collections, and stats.</Text>
                        </Paragraph>
                        <Form.Item 
                            className="input-field"
                            label="Current password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Current Password!'
                                }
                            ]}
                        >       
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col sm={24}>
                        <Form.Item>
                            <Spin spinning={loadingSubmit}>
                                <Button danger htmlType="submit" className="auth-form__submit ant-btn-dangerous">Delete account</Button>
                            </Spin>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default CloseAccount