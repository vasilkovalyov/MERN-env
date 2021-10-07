import $api from '../common/ajax-config'
import { API_URL } from '../config'
import routes from '../constants/routes'
import axios from 'axios'

class AuthServices {
    async login(email, password) {
        const response = await $api.post(routes.LOGIN, { params: {
            email,
            password
        }})
        return response.data
    }

    async registration({ name, surname, email, username, password }) {
        const response = await $api.post(routes.REGISTER, { params: {
            name,
            surname,
            email,
            password,
            username
        }})
        return response.data
    }

    async checkAuth() {
        const response = await axios.get(`${API_URL}${routes.REFRESH_TOKEN}`, {
            withCredentials: true
        })
        return response.data
    }

    async logout() {
        const response = await $api.post(routes.LOGOUT)
        return response.data
    }

    async getUsers() {
        const response = await $api.get('/users')
        return response.data
    }

    async deleteAccount(idUser, password) {
        const response = await $api.delete(`${routes.PROFILE.DELETE}`, { data: {
            idUser,
            password
        }});
        return response.data
    }

    async updateProfile(idUser, userInfo) {
        const response = await $api.put(`${routes.PROFILE.UPDATE_PROFILE}`, {
            idUser,
            profile: {...userInfo}
        });
        return response.data
    }

    async changePassword(idUser, params) {
        const response = await $api.put(`${routes.PROFILE.CHANGE_PASSWORD}`, {
            idUser,
            data: {...params}
        });
        return response.data
    }
}

export default new AuthServices()