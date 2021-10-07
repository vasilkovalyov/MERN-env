import { API_URL } from '../config'
import $api from '../common/ajax-config'
import routes from '../constants/routes'
import axios from 'axios'

class FileUploadService {
    async uploadImagePost(formData, options) {
        const response = await $api.put(`${API_URL}${routes.POSTS.UPLOAD_IMAGE}`, formData, options)
        return response.data
    }

    async uploadAvatarUser(formData, options) {
        const response = await $api.put(`${API_URL}${routes.PROFILE.UPLOAD_IMAGE}`, formData, options)
        return response.data
    }
}

export default new FileUploadService()