import React, {useState} from "react"
import {Box, Button, Divider, Typography} from "@mui/material";
import PostSingle from "./components/PostSingle";
import NewPostDialog from "./NewPostDialog";
import {useSelector} from "react-redux";
import {selectAllPosts} from "./PostsSlice";

const Posts = ({canAddNew = false}) => {
    const title = "Elenco dei disagi"
    const [newPostOpen, setNewPostOpen] = useState(false)
    const allPosts = useSelector(selectAllPosts)

    return (
        <Box sx={{mt: 2, textAlign: "center"}}>
            <Typography sx={{mb: 2}} variant={"h4"}>{title.toUpperCase()}</Typography>

            {canAddNew ?
                <Button onClick={() => setNewPostOpen(true)} variant={"contained"}>Aggiungi nuovo</Button> : ""}
            <NewPostDialog isOpen={newPostOpen} onClose={() => setNewPostOpen(false)}/>
            <Divider sx={{mt: 2}}/>
            <Box sx={{mt: 5, display: "flex", justifyItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                {allPosts !== undefined ? allPosts.map(post =>
                    <PostSingle date={post.date} events={post.events}/>) : ""}
            </Box>
        </Box>
    )
}

export default Posts