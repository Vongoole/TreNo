import React, {useState} from "react"
import {Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import PostTimeEvent from "./PostTimeEvent";
import NewPostDialog from "../NewPostDialog";
import {useDispatch, useSelector} from "react-redux";
import {selectPostById, setEditPostData} from "../PostsSlice";

const PostSingle = ({date, events, id}) => {

    const dispatch = useDispatch()
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    const parsedEvents = JSON.parse(events)
    const eventsToRender = parsedEvents.map(e => <PostTimeEvent time={e.time} text={e.text}/>)
    const dateArray = date.split("-")
    const reformattedDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
    const postToEdit = useSelector(state => selectPostById(state, id))
    const userLoggedIn = useSelector(state => state.user.session)

    const onEditDialogOpen = async () => {
        await dispatch(setEditPostData(postToEdit))
        setEditDialogOpen(true)
    }

    return (
        <Card sx={{m: 2, width: "350px", maxHeight: "400px"}}>
            <NewPostDialog isOpen={editDialogOpen} onClose={() => setEditDialogOpen(false)} id={id} type={"edit"}/>
            <CardActionArea
                sx={{height:"100%"}}
                onClick={userLoggedIn !== undefined && userLoggedIn !== null ? onEditDialogOpen : (() => false)}
            >
                <CardContent sx={{bgcolor: "#831a1a", mt:"-5%"}}>
                    <Typography variant={"h6"}>{reformattedDate}</Typography>
                </CardContent>
                <Box sx={{overflowY: "auto", height:"80%", "&::-webkit-scrollbar": {width: "5px"}, "&::-webkit-scrollbar-thumb": {bgcolor:"grey"}}}>
                    <CardContent sx={{display: "flex", flexDirection: "column", textAlign: "start", height: "100%"}}>
                        {eventsToRender}
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default PostSingle