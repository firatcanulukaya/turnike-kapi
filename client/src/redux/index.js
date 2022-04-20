import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import utils from "./reducers/utils";

const rootReducer = combineReducers({
    utils
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;