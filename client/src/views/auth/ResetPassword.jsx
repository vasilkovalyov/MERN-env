import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import Form from 'antd/es/form/'
import Input from 'antd/es/input/'
import Button from 'antd/es/button/'
import Typography from 'antd/es/typography/'
import Row from 'antd/es/row'
import Col from 'antd/es/col'

import { showAlert } from '../../shared/utils'
import routes from '../../constants/routes'

const { Title, Paragraph, Text } = Typography

const Home = () => {
    const history = useHistory();

    const onFinish = async({ email }) => {
        try {
            showAlert('success', 'Link to reset password has sent on your email');
            history.push('/login');
        } catch(e) {
            console.log(e);
            showAlert('error', 'Reset Error', e.message);
        }
    };

    return (
        <section className="section-auth">
            <div className="container">
                <Title className="ta-c" level={2}>Reset Password</Title>
                <Paragraph className="ta-c">
                    <Text>Go to <Link to={routes.HOME} className="text-underline">Home page</Link></Text>
                </Paragraph>
                <Form
                    name="register-form"
                    className="auth-form"
                    onFinish={onFinish}
                >
                    <Paragraph className="ta-c">
                        <Text>Don't have an account? <Link to={routes.REGISTER} className="text-underline">Register</Link></Text>
                    </Paragraph>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item 
                                className="input-field"
                                label="Email"
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
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="auth-form__submit">Reset Password</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Paragraph className="ta-c">
                        <Text>Do you have an account? <Link to={routes.LOGIN} className="text-underline">Login</Link></Text>
                    </Paragraph>
                </Form>
            </div>
        </section>
    )
}

export default Home