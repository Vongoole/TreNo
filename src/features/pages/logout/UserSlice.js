import {createSlice, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit";
import {getSession, login, logout, refreshSessionData} from "../../../app/supabase";

const UserAdapter = createEntityAdapter()
const initialState = UserAdapter.getInitialState({
    isLoading: false,
    session: null
})

const checkForExistingSession = async () => {
    const session = await getSession()
    if (session.data) return session

    return await refreshSessionData()
}

export const tryLogin = createAsyncThunk("user/tryLogin", async (payload) => {
    const {data, error} = await login(payload)
    if (error !== null) return error

    return data
})

export const tryLogout = createAsyncThunk("user/tryLogout", async (payload) => {
    const {data, error} = await logout()

    console.log(data, error)
    if (error !== null) return error

    return data
})

export const checkSession = createAsyncThunk("user/checkForExistingSession", async (payload) => {
    const {data, error} = await checkForExistingSession()
    if (error !== null) return error

    return data
})

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(tryLogin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(tryLogin.fulfilled, (state, action) => {
                state.session = action.payload.session
                state.isLoading = false
            })
            .addCase(tryLogin.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(tryLogout.pending, (state, action) => {
                state.isLoading = false
            })
            .addCase(tryLogout.fulfilled, (state, action) => {
                state.session = null
            })
            .addCase(tryLogout.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(checkSession.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.session = action.payload.session
                state.isLoading = false
            })
            .addCase(checkSession.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export default UserSlice.reducer