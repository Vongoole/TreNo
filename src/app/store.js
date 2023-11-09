import {configureStore} from "@reduxjs/toolkit"
import postsReduce from "../features/pages/posts/PostsSlice"
import userReducer from "../features/pages/logout/UserSlice";

const store = configureStore({
    reducer: {
        posts: postsReduce,
        user: userReducer,
    }
})

export default store