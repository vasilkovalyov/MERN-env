import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions'

import Typography from 'antd/es/typography'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Form from 'antd/es/form/'
import Input from 'antd/es/input/'
import Button from 'antd/es/button/'
import Spin from 'antd/es/spin'
import Progress from 'antd/es/progress'

import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { showAlert } from '../../../shared/utils'
import { isFileImage } from '../../../shared/functions'

import fileUploadService from '../../../services/FileUploadService'
import authService from '../../../services/AuthServices'


const { Title } = Typography

const Profile = () => {
    const dispatch = useDispatch();

    const authUser = useSelector(state => state.auth.authUser);
    const [loadingSubmit, setLoadingSubmit ] = useState(false);
    const [loadingFile, setLoadingFile ] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [fileUpload, setFileUpload] = useState(null);
    const [percentUploadProgress, setPercentUploadProgress] = useState(0);
    const [isVisibleButtonUpload, setIsVisibleButtonUpload] = useState(false);

    useEffect(() => {
        const formData = {
            name: authUser.name,
            surname: authUser.surname,
            email: authUser.email,
            username: authUser.username || null,
        }

        setImageUrl(authUser.image.url);

        form.setFieldsValue(formData);
        return () => {}
    }, [])

    const onFinish = async (formData) => {
        setLoadingSubmit(true);
        try {
            const updatePost = await authService.updateProfile(authUser._id, formData);
            showAlert('success', 'Profile has been update successfull');
        } catch(e) {
            console.log(e || e.response.data.message);
            showAlert('error', e.response.data.message);
            setLoadingSubmit(false);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const optionsUploadFile = {
        onUploadProgress: function(progressEvent) {
            const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            setPercentUploadProgress(percentCompleted)
        }
    }

    const uploadImage = async (e) => {
        e.preventDefault();
        setLoadingFile(true);
        try {
            fileUpload.append('_id', authUser._id);
            const response = await fileUploadService.uploadAvatarUser(fileUpload, optionsUploadFile);
            dispatch(actions.set_avatar_user(response.image))
            showAlert('success', 'Image has been upload successfull');
            setPercentUploadProgress(0);
        } catch(e) {
            console.log(e)
            setLoadingFile(false);
        } finally {
            setLoadingFile(false);
        }
    }

    const handleChange = info => {
        const file = info.file;
        const fileExt = file.name.split('.').pop();

        if (!isFileImage(fileExt)) {
            showAlert('error', 'You try to upload wrong types of file, you must upload only images (jpg, jpeg, png)');
            return
        }

        const formData = new FormData();
        formData.append('file', file);
        setFileUpload(formData);

        const src = URL.createObjectURL(file);
        setImageUrl(src);
        setIsVisibleButtonUpload(true)
    };

    return (
        <div className="profile-info">
            <Title level={5}>Edit profile</Title>
            <Row gutter={30}>
                <Col xs={24} lg={8}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader profile-info__avatar-uploader ta-c"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleChange}
                    >
                        <Fragment>
                            {
                                imageUrl 
                                ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                : <div>{ loadingFile ? <LoadingOutlined /> : <PlusOutlined /> }</div>
                            }
                        </Fragment>
                    </Upload>
                    { percentUploadProgress > 0 ? <Progress percent={percentUploadProgress} /> : null }
                    {
                        isVisibleButtonUpload && 
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="auth-form__submit" 
                            onClick={(e) => uploadImage(e)}
                        >Update image</Button>
                    }
                </Col>
                <Col xs={24} lg={16}>
                    <Form
                        name="register-form"
                        className="auth-form"
                        onFinish={onFinish}
                        form={form}
                    >
                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
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
                            <Col xs={24} sm={12}>
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
                                    label="Username (only letters, numbers, and underscores)"
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
                                <Form.Item>
                                    <Spin spinning={loadingSubmit}>
                                        <Button 
                                            type="primary"
                                            htmlType="submit" 
                                            className="auth-form__submit" 
                                        >Update account</Button>
                                    </Spin>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Profile