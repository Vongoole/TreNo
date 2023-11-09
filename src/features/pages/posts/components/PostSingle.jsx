import React, {useState} from "react"
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
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
    const postToEdit = useSelector(state => selectPostById(state,id))

    const onEditDialogOpen = async () => {
        await dispatch(setEditPostData(postToEdit))
        setEditDialogOpen(true)
    }

    return (
        <Card sx={{m: 2, width: "350px", height: "100%"}}>
            <NewPostDialog isOpen={editDialogOpen} onClose={() => setEditDialogOpen(false)} id={id} type={"edit"}/>
            <CardActionArea onClick={onEditDialogOpen}>
                <CardContent sx={{bgcolor: "#831a1a"}}>
                    <Typography variant={"h6"}>{reformattedDate}</Typography>
                </CardContent>
                <CardContent sx={{display: "flex", flexDirection: "column", textAlign: "start"}}>
                    {eventsToRender}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PostSingle