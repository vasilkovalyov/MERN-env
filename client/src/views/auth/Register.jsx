import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import actions from '../../redux/actions'

import Form from 'antd/es/form/'
import Input from 'antd/es/input/'
import Button from 'antd/es/button/'
import Typography from 'antd/es/typography/'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Spin from 'antd/es/spin'

import { showAlert } from '../../shared/utils'
import routes from '../../constants/routes'
import jwtService from '../../common/jwt.service'

import authServices from '../../services/AuthServices'

const { Title, Paragraph, Text } = Typography

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadingSubmit, setLoadingSubmit ] = useState(false);

    useEffect(() => {
        return () => {
            setLoadingSubmit(false)
        }
    }, [])

    const onFinish = async (formData) => {
        setLoadingSubmit(true);
        try {
            const response = await authServices.registration(formData)

            if (response.user) {
                jwtService.setToken(response.accessToken);
                jwtService.setRefreshToken(response.refreshToken);
                dispatch(actions.register_user(response.user));
                showAlert('success', 'Registration Success');
                history.push('/');
            }
        } catch(e) {
            setLoadingSubmit(false);
            showAlert('error', 'Registration Error', e.response.data.message || e);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <section className="section-auth">
            <div className="container">
                <Title className="ta-c" level={2}>Register</Title>
                <Paragraph className="ta-c">
                    <Text>Go to <Link to={routes.HOME} className="text-underline">Home page</Link></Text>
                </Paragraph>
                <Form
                    name="register-form"
                    className="auth-form"
                    onFinish={onFinish}
                >
                    <Paragraph className="ta-c">
                        <Text>Do you have an account? <Link to={routes.LOGIN}>Login</Link></Text>
                    </Paragraph>
                    <Row gutter={16}>
                        <Col md={12}>
                            <Form.Item 
                                className="input-field"
                                label="First name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your First Name!'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item 
                                className="input-field"
                                label="Last name"
                                name="surname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Last Name!'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item 
                                className="input-field"
                                label="Email address"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item 
                                className="input-field"
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item 
                                className="input-field"
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!'
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Spin spinning={loadingSubmit}>
                                    <Button type="primary" htmlType="submit" className="auth-form__submit">Register</Button>
                                </Spin>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </section>
    )
}

export default Home