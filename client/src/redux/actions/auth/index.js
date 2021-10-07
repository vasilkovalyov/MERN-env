import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    SET_AVATAR_USER
} from '../../constants'

export const login_user = (userData) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER,
            data: {...userData}
        });
    }
}

export const logout_user = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_USER,
            data: {}
        });
    }
}

export const register_user = (userData) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_USER,
            data: userData
        });
    }
}

export const set_avatar_user = (avatar) => {
    return (dispatch) => {
        dispatch({
            type: SET_AVATAR_USER,
            data: avatar
        });
    }
}