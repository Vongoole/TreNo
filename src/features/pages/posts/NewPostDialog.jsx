import React, {useEffect} from "react"
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
    addEditPostEvent,
    addNewPostEvent, removeEditPostEvent,
    removeNewPostEvent, resetEditPostData, resetNewPostData,
    saveNewPost, selectEditPostData, selectEditPostEvents, selectNewPostData,
    selectNewPostEvents, selectPostById, setEditPostData, setEditPostDate, setEditPostEvent,
    setNewPostDate,
    setNewPostEvent, updateEditedPost
} from "./PostsSlice";

const NewPostDialog = ({isOpen, onClose, type = "new", id = null}) => {

    const config = type === "new" ? {
        getData: selectNewPostData,
        getEvents: selectNewPostEvents,
        addEvent: addNewPostEvent,
        updateDate: (val) => setNewPostDate(val),
        updateEvent: (index, time, text) => setNewPostEvent({eventIndex: index, time, text}),
        removeEvent: (index) => removeNewPostEvent({eventIndex: index}),
        onSave: async (payload) => {
            await dispatch(saveNewPost(payload))
            await dispatch(resetNewPostData())
        }
    } : {
        getData: selectEditPostData,
        getEvents: selectEditPostEvents,
        addEvent: addEditPostEvent,
        updateDate: (val) => setEditPostDate(val),
        updateEvent: (index, time, text) => setEditPostEvent({eventIndex: index, time, text}),
        removeEvent: (index) => removeEditPostEvent({eventIndex: index}),
        onSave: async (payload) => {
            await dispatch(updateEditedPost({...payload, id}))
            await dispatch(resetEditPostData())
        }
    }

    const dispatch = useDispatch()

    const newPostData = useSelector(config.getData)
    const newPostEvents = useSelector(config.getEvents)

    const onEventChangeHandle = (index, time, text) => dispatch(config.updateEvent(index, time, text))
    const onRemoveEventHandle = (index) => dispatch(config.removeEvent(index))


    const onSaveEventHandle = async () => {
        await config.onSave(newPostData)
        onClose()
        window.location.reload(false)
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{type==="new" ? "Aggiungi" : "Modifica"} disagio</DialogTitle>
            <DialogContent sx={{width: {xs: "290px", md: "400px", xl: "600px"}}}>
                <DialogContentText>
                    <TextField
                        margin="dense"
                        id="date"
                        type="date"
                        variant="standard"
                        value={newPostData.date}
                        onChange={(e) => dispatch(config.updateDate(e.target.value))}
                        label={"Data"}
                    />
                    {newPostEvents !== undefined ? newPostEvents.map(e =>
                        <Discomfort data={e} onChange={onEventChangeHandle} onRemove={onRemoveEventHandle}/>) : ""}
                    <Box sx={{mt: 2, textAlign: "center"}}>
                        <Button
                            variant={"contained"}
                            sx={{borderRadius: "20px"}}
                            onClick={() => dispatch(config.addEvent())}
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