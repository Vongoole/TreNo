import React from "react"
import {Card, CardContent, Typography} from "@mui/material";
import PostTimeEvent from "./PostTimeEvent";

const PostSingle = ({date, events}) => {

    const parsedEvents = JSON.parse(events)
    const eventsToRender = parsedEvents.map(e => <PostTimeEvent time={e.time} text={e.text}/>)
    const dateArray = date.split("-")
    const reformattedDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
    return (
        <Card sx={{m: 2, width: "350px", height:"100%"}}>
            <CardContent sx={{bgcolor: "#831a1a"}}>
                <Typography variant={"h6"}>{reformattedDate}</Typography>
            </CardContent>
            <CardContent sx={{display: "flex", flexDirection: "column", textAlign: "start"}}>
                {eventsToRender}
            </CardContent>
        </Card>
    )
}

export default PostSingle