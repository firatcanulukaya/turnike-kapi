import {LOGIN_USER, GET_ALL_STUDENTS, GET_STUDENT} from "../types";

const initialState = {
    user: null,
    students: null,
    student: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        case GET_ALL_STUDENTS:
            return {
                ...state,
                students: action.payload
            }
        case GET_STUDENT:
            return {
                ...state,
                student: action.payload
            }
        default:
            return state
    }
}