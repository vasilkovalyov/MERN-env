import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import actions from '../../redux/actions'

import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Typography from 'antd/es/typography'
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

    const onFinish = async ({ email, password }) => {
        setLoadingSubmit(true);
        try {
            const response = await authServices.login(email, password)

            if (response.user) {
                jwtService.setToken(response.accessToken);
                jwtService.setRefreshToken(response.refreshToken);
                dispatch(actions.login_user(response.user));
                showAlert('success', 'Auth Success');
                history.push('/');
            }
        } catch(e) {
            setLoadingSubmit(false);
            showAlert('error', 'Auth Error', e.response.data.message);
        } finally {
            setLoadingSubmit(false);
        }
    };



    return (
        <section className="section-auth">
            <div className="container">
                <Form
                    name="login-form"
                    className="auth-form"
                    onFinish={onFinish}
                >
                    <Title className="ta-c" level={2}>Login</Title>
                    <Paragraph className="ta-c">
                        <Text>Go to <Link to={routes.HOME} className="text-underline">Home page</Link></Text>
                    </Paragraph>
                    <Paragraph className="ta-c">
                        <Text>Don't have an account? <Link to={routes.REGISTER} className="text-underline">Register</Link></Text>
                    </Paragraph>
                    <Form.Item 
                        className="input-field"
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        className="input-field"
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Spin spinning={loadingSubmit}>
                            <Button type="primary" htmlType="submit" className="auth-form__submit">Login</Button>
                        </Spin>
                    </Form.Item>
                    <Paragraph className="ta-c">
                        <Text>Forgot password? <Link to={routes.RESET_PASSWORD} className="text-underline">Reset password</Link></Text>
                    </Paragraph>
                </Form>
            </div>
        </section>
    )
}

export default Home