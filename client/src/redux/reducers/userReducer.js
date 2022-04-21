import {LOGIN_USER} from "../types";

const initialState = {
    user: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}