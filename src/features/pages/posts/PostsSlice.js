import {createSlice, createEntityAdapter, createAsyncThunk, createSelector} from "@reduxjs/toolkit";
import {getDateValue, getTimeValue} from "../../../app/utils/date";
import {addDiscomfortEvent, getAllDiscomfortEvents, updateDiscomfortEvent} from "../../../app/supabase";

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

// order posts by date. Posts which have equal dates are ordered by Id instead
const postsAdapter = createEntityAdapter({
    select: (item) => item.date,
    sortComparer: (a, b) => {
        const parsedA = Date.parse(a.date)
        const parsedB = Date.parse(b.date)
        return parsedA === parsedB ? b.id - a.id : parsedB - parsedA
    }
})
const initialState = postsAdapter.getInitialState({
    isLoading: false,
    newPost: emptyNewPostObj,
    editPost: emptyNewPostObj
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

export const updateEditedPost = createAsyncThunk("posts/updateEditedPost", async (payload) => {
    const {data, error} = await updateDiscomfortEvent(payload)
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
        addEditPostEvent: (state, action) => {
            const events = state.editPost.events
            state.editPost.events = [
                ...events,
                {time: getTimeValue(), text: ""}
            ]
        },
        removeNewPostEvent: (state, action) => {
            const events = [...state.newPost.events]
            events.splice(action.payload.eventIndex, 1)
            state.newPost.events = [
                ...events
            ]
        },
        removeEditPostEvent: (state, action) => {
            const events = [...state.editPost.events]
            events.splice(action.payload.eventIndex, 1)
            state.editPost.events = [
                ...events
            ]
        },
        setNewPostDate: (state, action) => {
            state.newPost.date = action.payload
        },
        setEditPostDate: (state, action) => {
            state.editPost.date = action.payload
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
        setEditPostEvent: (state, action) => {
            const newTime = action.payload.time
            const newText = action.payload.text
            const index = action.payload.eventIndex
            const events = state.editPost.events

            state.editPost.events[index] = {
                time: newTime ?? events[index].time,
                text: newText ?? events[index].text
            }
        },
        setEditPostData: (state, action) => {
            const payload = action.payload
            state.editPost = {
                date: payload.date,
                events: JSON.parse(payload.events)
            }
        },
        resetNewPostData: (state, action) => {
            state.newPost = emptyNewPostObj
        },
        resetEditPostData: (state, action) => {
            state.editPost = emptyNewPostObj
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
            .addCase(updateEditedPost.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateEditedPost.fulfilled, (state, action) => {
                state.isLoading = false
                const updatePayload = {...action.payload, events: JSON.stringify(action.payload.events)}
                postsAdapter.setOne(state, updatePayload)
            })
            .addCase(updateEditedPost.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export const {
    addNewPostEvent,
    setNewPostEvent,
    setNewPostDate,
    removeNewPostEvent,
    resetNewPostData,
    addEditPostEvent,
    addPost,
    addPosts,
    removeEditPostEvent,
    resetEditPostData,
    setEditPostData,
    setEditPostDate,
    setEditPostEvent,
} = postsSlice.actions

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
} = postsAdapter.getSelectors(state => state.posts)

export const selectNewPostEvents = createSelector(
    state => state.posts.newPost.events,
    events => events.map((value, key) => ({key, value}))
)
export const selectEditPostEvents = createSelector(
    state => state.posts.editPost.events,
    events => events.map((value, key) => ({key, value}))
)
export const selectNewPostData = createSelector(
    state => state.posts.newPost,
    newPost => newPost
)
export const selectEditPostData = createSelector(
    state => state.posts.editPost,
    editPost => editPost
)

export default postsSlice.reducer
