import user from "./user_reducers"
import blogReducer from "./blog_reducers"
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    user, blogReducer
})

export default rootReducer