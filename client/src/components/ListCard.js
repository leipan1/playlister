import SongCard from './SongCard'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'

import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AuthContext from '../auth'
import List from '@mui/material/List';
import { Button } from '@mui/material'



function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const { auth } = useContext(AuthContext);
    const [loadPlaylist, setLoadPlaylist] = useState(false);

    

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }


    function handleLoadList(event, id) {
        let status=loadPlaylist
        console.log(status)
        if(store.currentList && !status){
            alert("Please close opened playlist first")
        }
        else{
            setLoadPlaylist(!status)
            console.log("handleLoadList for " + id);
            
            if (!event.target.disabled && !status) {
                console.log("setting current list")
                let _id = event.target.id;
                if (_id.indexOf('list-card-text-') >= 0)
                    _id = ("" + _id).substring("list-card-text-".length);
                store.setCurrentList(id);
            }
        }

    }



    function handleToggleEdit(event) {
        console.log("toggled edit:"+loadPlaylist)
        if(loadPlaylist){
            event.stopPropagation();
            toggleEdit();
        }
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            console.log("ENTER!!!")
            let id = event.target.id.substring("list-".length);
            console.log(id)
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }

    let songCard=""
    if(loadPlaylist && store.currentList){
        songCard=
        <Box>
        <List
        id="playlist-cards"
        sx={{width:'100%'}}>
            {
                store.currentList.songs.map((song, index) =>(
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))
            }
        </List>  
        { modalJSX }
        </Box>
    }


    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <div class="playlist-card">
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                // sx={{ marginTop: '15px', display: 'flex', p: 1 }}
                // style={{ width: '100%', fontSize: '20pt'}}
                // button
                // onClick={(event) => {
                //     handleLoadList(event, idNamePair._id)
                // }}
            >
                <Box 
                    // sx={{ p: 2, flexGrow: 1}}
                    // style={{top:'0', position: 'absolute'}}
                    id="playlist-card-name">
                    {idNamePair.name}
                </Box>
                <Box 
                    // sx={{ p: 2, flexGrow: 1}}
                    // style={{position: 'relative'}}
                    id="playlist-card-owner">
                    By: {auth.user.firstName} {auth.user.lastName}
                </Box>
                <Box
                    id="playlist-card-showmore"
                    onClick={(event)=>{
                        handleLoadList(event,idNamePair._id)
                    }}
                >
                    <KeyboardDoubleArrowDownIcon
                        fontSize='large'
                        cursor= 'pointer'

                    />
                </Box>
                
                
                {/* <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box> */}
                {/* <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box> */}
            </ListItem>
        </div>
        

    if (editActive) {
        cardElement =
            <div class="playlist-card-expand">
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                style={{backgroundColor:'#808B96', borderRadius:'10px'}}
            >
                 <TextField
                    margin="normal"
                    fullWidth
                    required
                    id={"list-" + idNamePair._id}
                    label="Playlist Name"
                    name="name"
                    autoComplete="Playlist Name"
                    className='list-card'
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    defaultValue={idNamePair.name}
                    inputProps={{style: {fontSize: 48}}}
                    InputLabelProps={{style: {fontSize: 24}}}
                    autoFocus
                />
            </ListItem>
        </div>
            
    }

    if(loadPlaylist && !editActive){
        cardElement=
        <div class="playlist-card-expand">
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                style={{backgroundColor:'#808B96', borderRadius:'10px'}}
            >
                <Box 
                    id="playlist-card-name"
                    onDoubleClick={handleToggleEdit}
                    >
                    {idNamePair.name}
                </Box>
                <Box 
                    id="playlist-card-owner">
                    By: {auth.user.firstName} {auth.user.lastName}
                </Box>
                {/* <Box>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box> */}
                {/* <div
                        // className='list-card unselected-list-card add-song-button'
                        // id='add-song-button'
                        onClick={handleAddNewSong}
                        // variant="contained"
                        >
                        +
                </div> */}
                <Box
                    id="playlist-card-showmore"
                    onClick={(event)=>{
                        handleLoadList(event,idNamePair._id)
                    }}
                >
                    <KeyboardDoubleArrowUpIcon
                        fontSize='large'
                        cursor= 'pointer'
                        onClick={handleClose}
                    />
                </Box>
                <div id="playlist-song-cards">
                    {
                        songCard
                    }
                </div>
                <Button
                    disabled={!store.foolproof()}
                    id='add-song-button'
                    onClick={handleAddNewSong}
                    variant="contained">
                    <AddIcon />
                </Button>
                <Button 
                    disabled={!store.canUndo()}
                    id='undo-button'
                    onClick={handleUndo}
                    variant="contained">
                    <UndoIcon />
                </Button>
                <Button 
                    disabled={!store.canRedo()}
                    id='redo-button'
                    onClick={handleRedo}
                    variant="contained">
                    <RedoIcon />
                </Button>
                <Button
                    disabled={!store.foolproof()}
                    id="publish-song-button">
                    Publish
                </Button>
                <Button
                    disabled={!store.foolproof()}
                    id="delete-song-button"
                    onClick={(event)=>{
                        handleDeleteList(event,idNamePair._id)
                    }}>
                    Delete
                </Button>
                <Button
                    disabled={!store.foolproof()}
                    id="duplicate-song-button">
                    Duplicate
                </Button>
            </ListItem>
        </div>
    }


    return (
        cardElement
    );
}

export default ListCard;