import React from "react"
import {Box, Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {tryLogout} from "./UserSlice";

const Login = () => {
    const dispatch = useDispatch()

    const onLogoutHandle = () => {
        dispatch(tryLogout())
    }

    return (
        <Box sx={{textAlign: "right"}}>
            <Button variant={"contained"} color={"secondary"} onClick={onLogoutHandle}>Logout</Button>
        </Box>
    )
}

export default Login