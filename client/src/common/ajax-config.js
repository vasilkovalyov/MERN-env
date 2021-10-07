import axios from 'axios'
import jwtService from './jwt.service'
import { API_URL } from '../config'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    method: ['get', 'post', 'put', 'delete']
})

$api.interceptors.request.use(( config ) => {
    const accessToken = jwtService.getToken();
    if (accessToken) {
        config.headers.Authorization = accessToken
    }
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        error.config._isRetry = true;
        try {
            const response = await axios.get(API_URL + '/refresh-token', {
                withCredentials: true
            })
            if (response) {
                jwtService.setToken(response.data.accessToken);
                return $api.request(originalRequest);
            }
        } catch(e) {
            console.log('User doesn`t authorized')
        }
    }
    throw error
})

export default $api
