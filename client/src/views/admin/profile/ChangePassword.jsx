import React, { useState } from 'react'
import {useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Typography from 'antd/es/typography'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Form from 'antd/es/form/'
import Input from 'antd/es/input/'
import Button from 'antd/es/button/'
import Spin from 'antd/es/spin'
import Space from 'antd/es/space'

import { showAlert } from '../../../shared/utils'
import authServices from '../../../services/AuthServices'


const { Title, Paragraph, Text } = Typography

const ChangePassword = () => {
    const [loadingSubmit, setLoadingSubmit ] = useState(false);
    const [form] = Form.useForm();

    const authUser = useSelector(state => state.auth.authUser);

    const onFinish = async (formData) => {
        setLoadingSubmit(true);
        try {
            const response = await authServices.changePassword(authUser._id, formData);

            showAlert('success', 'The password has been update successfull');
        } catch(e) {
            console.log(e);
            showAlert('error', 'Change password error', e.response.data.message);
            setLoadingSubmit(false);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <div className="profile-info">
            <Title level={5}>Change password</Title>
            <Form
                name="register-form"
                className="auth-form"
                onFinish={onFinish}
                form={form}
            >
                <Row>
                    <Col sm={24}>
                        <Form.Item 
                            className="input-field"
                            label="Old password"
                            name="oldPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Old Password!'
                                }
                            ]}
                        >
                            <Input.Password  />
                        </Form.Item>
                    </Col>
                    <Col sm={24}>
                        <Form.Item 
                            className="input-field"
                            label="Password"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]}
                        >
                            <Input.Password  />
                        </Form.Item>
                    </Col>
                    <Col sm={24}>
                        <Form.Item 
                            className="input-field"
                            label="Password confirmation"
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password Confirmation!'
                                }
                            ]}
                        >
                            <Input.Password  />
                        </Form.Item>
                    </Col>
                    <Col sm={24}>
                        <Form.Item>
                            <Spin spinning={loadingSubmit}>
                                <Button type="primary" htmlType="submit" className="auth-form__submit">Change password</Button>
                            </Spin>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ChangePassword