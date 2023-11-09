import React, {useState} from "react"
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {useDispatch} from "react-redux";
import {tryLogin} from "./UserSlice";

const Login = () => {

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onLoginHandle = async () => {
        const res = await dispatch(tryLogin({email, password}))
        console.log("login res", res)
    }

    return (
        <Box sx={{textAlign: "right"}}>
            <Button variant={"contained"} onClick={() => setIsOpen(true)}>Login</Button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>LOGIN</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            type={"email"}
                            label={"Email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            type={"password"}
                            label={"Password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={()=> onLoginHandle()} variant={"contained"}>Login</Button>
                        <Button onClick={() => setIsOpen(false)} variant={"outlined"} color={"secondary"}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default Login