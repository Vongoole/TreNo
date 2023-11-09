import React from "react"
import {Box, Button, Divider, TextField} from "@mui/material";

const Discomfort = ({data, onChange, onRemove}) => {
    const {key, value} = data

    return (
        <Box>
            <Box sx={{textAlign: "end", position:"relative"}}>
                <Button variant={"outlined"} color={"secondary"} onClick={() => onRemove(key)}>X</Button>
            </Box>
            <Divider sx={{mt: 2}}>
                <TextField
                    margin="dense"
                    id="time"
                    type="time"
                    variant="standard"
                    value={value.time}
                    onChange={(e) => onChange(key, e.target.value, undefined)}
                />
            </Divider>
            <TextField
                autoFocus={true}
                margin="dense"
                id="text"
                type="text"
                fullWidth
                variant="standard"
                value={value.text}
                onChange={(e) => onChange(key, undefined, e.target.value)}
                label={"Disagio"}
            />
        </Box>
    )
}

export default Discomfort