import React from "react"
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
import Discomfort from "./components/Discomfort";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewPostEvent,
    removeNewPostEvent, resetNewPostData,
    saveNewPost,
    selectNewPostEvents,
    setNewPostDate,
    setNewPostEvent
} from "./PostsSlice";

const NewPostDialog = ({isOpen, onClose}) => {

    const dispatch = useDispatch()
    const newPostEvents = useSelector(selectNewPostEvents)
    const newPostData = useSelector(state => state.posts.newPost)

    const onEventChangeHandle = (index, time, text) => dispatch(setNewPostEvent({eventIndex: index, time, text}))
    const onRemoveEventHandle = (index) => dispatch(removeNewPostEvent({eventIndex: index}))


    const onSaveEventHandle = async () => {
        await dispatch(saveNewPost(newPostData))
        await dispatch(resetNewPostData())
        onClose()
        window.location.reload(false)

    }
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Aggiungi disagio</DialogTitle>
            <DialogContent sx={{width: {xs: "290px", md: "400px", xl: "600px"}}}>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        id="date"
                        type="date"
                        variant="standard"
                        value={newPostData.date}
                        onChange={(e) => dispatch(setNewPostDate(e.target.value))}
                        label={"Data"}
                    />
                    {newPostEvents !== undefined ? newPostEvents.map(e =>
                        <Discomfort data={e} onChange={onEventChangeHandle} onRemove={onRemoveEventHandle}/>) : ""}
                    <Box sx={{mt: 2, textAlign: "center"}}>
                        <Button
                            variant={"contained"}
                            sx={{borderRadius:"20px"}}
                            onClick={() => dispatch(addNewPostEvent())}
                        >+</Button>
                    </Box>
                </DialogContentText>
                <DialogActions>
                    <Button variant={"contained"} onClick={onSaveEventHandle}>Salva</Button>
                    <Button variant={"outlined"} color={"secondary"} onClick={onClose}>Chiudi</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}


export default NewPostDialog