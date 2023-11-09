import {createSlice, createEntityAdapter, createAsyncThunk, createSelector} from "@reduxjs/toolkit";
import {getDateValue, getTimeValue} from "../../../app/utils/date";
import {addDiscomfortEvent, getAllDiscomfortEvents} from "../../../app/supabase";

const mockNewPostObj = {
    date: "2023-11-08",
    events: [
        {time: "07:05", text: "some text here"},
        {time: "07:42", text: "some text here"}
    ]
}

const emptyNewPostObj = {
    date: getDateValue(),
    events: [
        {time: getTimeValue(), text: ""}
    ]
}

const postsAdapter = createEntityAdapter()
const initialState = postsAdapter.getInitialState({
    isLoading: false,
    newPost: emptyNewPostObj
})

export const fetchAllPosts = createAsyncThunk("posts/fetchPosts", async (payload) => {
    const {data, error} = await getAllDiscomfortEvents()
    if (error !== null) return error

    return data
})

export const saveNewPost = createAsyncThunk("posts/saveNewPost", async (payload) => {
    const {data, error} = await addDiscomfortEvent(payload)
    if (error !== null) return error

    return payload
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => postsAdapter.addOne(state, action),
        addPosts: (state, action) => postsAdapter.addMany(state, action),
        addNewPostEvent: (state, action) => {
            const events = state.newPost.events
            state.newPost.events = [
                ...events,
                {time: getTimeValue(), text: ""}
            ]
        },
        removeNewPostEvent: (state, action) => {
            const events = [...state.newPost.events]
            console.log("copied events: ", events)
            events.splice(action.payload.eventIndex, 1)
            state.newPost.events = [
                ...events
            ]
        },
        setNewPostDate: (state, action) => {
            state.newPost.date = action.payload
        },
        setNewPostEvent: (state, action) => {
            const newTime = action.payload.time
            const newText = action.payload.text
            const index = action.payload.eventIndex
            const events = state.newPost.events

            state.newPost.events[index] = {
                time: newTime ?? events[index].time,
                text: newText ?? events[index].text
            }
        },
        resetNewPostData: (state, action) => {
            state.newPost = emptyNewPostObj
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllPosts.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.isLoading = false
                postsAdapter.addMany(state, action)
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(saveNewPost.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(saveNewPost.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(saveNewPost.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export const {
    addNewPostEvent,
    setNewPostEvent,
    setNewPostDate,
    removeNewPostEvent,
    resetNewPostData
} = postsSlice.actions

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
} = postsAdapter.getSelectors(state => state.posts)

export const selectNewPostEvents = createSelector(
    state => state.posts.newPost.events,
    events => events.map((value, key) => ({key, value}))
)

export default postsSlice.reducer
