import React from "react"
import {Box, Chip, Divider, Typography} from "@mui/material";

const PostTimeEvent = ({time, text}) => {
    return (
        <Box>
            <Divider sx={{mt:2, mb:2}}>
                <Chip label={time} sx={{
                    bgcolor: "#eeeeee",
                    color: "black",
                    fontWeight: "bold"
                }}/>
            </Divider>
            <Typography variant={"body1"}>{text}</Typography>
        </Box>
    )
}

export default PostTimeEvent