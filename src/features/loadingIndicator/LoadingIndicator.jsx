import React from "react"
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";

const LoadingIndicator = () => {
    const userLoading = useSelector(state => state.user.isLoading)
    const postsLoading = useSelector(state => state.posts.isLoading)
    return (
        <Backdrop open={userLoading || postsLoading} sx={{zIndex:9999}}>
            <CircularProgress/>
        </Backdrop>
    )
}

export default LoadingIndicator