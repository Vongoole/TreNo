import React, {useEffect, useState} from "react"
import {Box, Button, Divider, Pagination, Typography} from "@mui/material";
import PostSingle from "./components/PostSingle";
import NewPostDialog from "./NewPostDialog";
import {useSelector} from "react-redux";
import {selectAllPosts} from "./PostsSlice";
import {constructPagination} from "../../../app/utils/posts";

const Posts = ({canAddNew = false}) => {
    const title = "Elenco dei disagi"
    const [newPostOpen, setNewPostOpen] = useState(false)
    const posts = useSelector(selectAllPosts)
    const [currentPage, setCurrentPage] = useState(0)
    const [paginatedPosts, setPaginatedPosts] = useState({pages: [], total: 0})

    useEffect(() => {
        if (posts.length > 0) {
            setPaginatedPosts(constructPagination(posts, 8))
        }
    }, [posts])

    return (
        <Box sx={{mt: 2, textAlign: "center"}}>
            <Typography sx={{mb: 2}} variant={"h4"}>{title.toUpperCase()}</Typography>

            {canAddNew ?
                <Button onClick={() => setNewPostOpen(true)} variant={"contained"}>Aggiungi nuovo</Button> : ""}
            <NewPostDialog isOpen={newPostOpen} onClose={() => setNewPostOpen(false)}/>
            <Divider sx={{mt: 2}}/>

            <Box sx={{mt: 5, display: "flex", justifyItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                {paginatedPosts.pages.length > 0 ? paginatedPosts.pages[currentPage].map(post =>
                    <PostSingle date={post.date} events={post.events} id={post.id}/>) : ""}
            </Box>

            <Box sx={{mt: 3, mb:5, display: "flex", justifyContent: "center"}}>
                {paginatedPosts.pages.length > 1 ?
                    <Pagination
                        count={paginatedPosts.total}
                        color={"secondary"}
                        page={currentPage+1}
                        variant={"outlined"}
                        shape={"rounded"}
                        onChange={(e, val) => setCurrentPage(val - 1)}/> : ""}
            </Box>
        </Box>
    )
}

export default Posts