import {LOGIN_USER, GET_ALL_STUDENTS, GET_STUDENT, GET_ALL_TEACHERS, GET_ALL_USERS} from "../types";

const initialState = {
    user: null,
    students: null,
    student: null,
    teachers: null,
    users: null
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
        case GET_ALL_TEACHERS:
            return {
                ...state,
                teachers: action.payload
            }
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}