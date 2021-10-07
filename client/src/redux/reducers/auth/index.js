import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    SET_AVATAR_USER
} from '../../constants'

const initialStore = {
    authUser: {}
}

const reducer = (state = initialStore, action) => {
    switch(action.type) {
        case LOGIN_USER : 
            if(action.data) {
                return {
                    ...state,
                    authUser: {...action.data},
                }
            }
        case LOGOUT_USER :
            return {
                ...state,
                authUser: {...action.data},
            }
        case REGISTER_USER :
            if(action.data) {
                return {
                    ...state,
                    authUser: {...action.data},
                }
            }
        case SET_AVATAR_USER:
            return {
                ...state,
                authUser: {
                    ...state.authUser,
                    image: action.data
                },
            }
        default:
            return state
    }
}

export default reducer