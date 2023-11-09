import React from "react"
import {Box, Chip, Divider, TextField, Typography} from "@mui/material";

const PostEditableTimeEvent = ({time, text}) => {

    return (
        <Box>
            <Divider sx={{mt:2, mb:2}}>
                <TextField
                    type={"time"}
                    variant={"standard"}
                    value={time}
                />
            </Divider>
            <TextField
                variant={"standard"}
                type={"text"}
                label={"Disagio"}
                value={text}
                fullWidth
                />
        </Box>
    )
}

export default PostEditableTimeEvent