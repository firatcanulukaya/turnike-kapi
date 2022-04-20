import {TEST} from '../types';

const initial_state = {
    test: "Hello World",
}

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case TEST:
            return {
                ...state,
                test: action.payload
            }
        default:
            return state
    }
}

export default reducer;