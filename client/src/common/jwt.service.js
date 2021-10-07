class jwtService {
    setToken = (token) => {
        localStorage.setItem('authToken', token)
    }
    getToken = () => {
        return localStorage.getItem('authToken') || null
    }
    removeToken = () => {
        return localStorage.removeItem('authToken') || null
    }
    setRefreshToken = (token) => {
        localStorage.setItem('refreshToken', token)
    }
    getRefreshToken = () => {
        return localStorage.getItem('refreshToken') || null
    }
    removeRefreshToken = () => {
        return localStorage.removeItem('refreshToken') || null
    }
}

export default new jwtService()
