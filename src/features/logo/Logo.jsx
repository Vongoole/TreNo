import React from "react"
import {Box} from "@mui/material";

const logoSrc = process.env.REACT_APP_LOGO

const Logo = () => {
    return (
        <Box sx={{display:"flex", justifyContent:"center"}}>
            <img src={logoSrc} height={"auto"} width={"100%"} style={{ maxWidth:"350px"}}/>
        </Box>
    )
}

export default Logo