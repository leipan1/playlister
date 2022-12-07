import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Statusbar from './Statusbar';
import MenuBar from './MenuBar';
import Youtube from 'react-youtube';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';


const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    const opts = {
        height: '320',
        width: '480',
    };

    return (
        <div id="playlist-selector">
            <MenuBar/>
            <div id="list-selector-heading">
            {/* <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
            <AddIcon />
            </Fab>
            <Typography variant="h4">Your Lists</Typography> */}
            </div>
            <div id="playlist-selector-body">
                <div id="playlist-selector-left">
                    <div id="list-selector-list">
                        {
                            listCard
                        }
                        <MUIDeleteModal />
                    </div>
                </div>
                <div id="playlist-selector-right">
                        <div id="playlist-selector-right-tabs">
                            <button id="playlist-selector-right-tabs-button">Player</button>
                            <button id="playlist-selector-right-tabs-button">Comments</button>
                        </div>
                        <div id="youtube-player">
                            <Youtube videoId="2g811Eo7K8U" opts={opts}></Youtube>
                        </div>
                        <div id="youtuber-player-status">
                            Now Playing
                            <table id="youtuber-player-status-grid">
                                <td>Playlist:</td>
                                <td>Song:</td>
                                <td>Title:</td>
                                <td>Artist:</td>
                            </table>
                            <div id="youtuber-player-status-options">
                                <FastRewindIcon
                                    fontSize='inherit'
                                />
                                <StopIcon
                                    fontSize='inherit'
                                />
                                <PlayArrowIcon
                                    fontSize='inherit'
                                />
                                <FastForwardIcon
                                    fontSize='inherit'
                                />
                            </div>
                        </div>
                </div>
            </div>
            {/* <Statusbar/> */}
            <div id="home-screen-add-list-button">
                <Fab 
                    disabled={!store.canAddList()}
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                <AddIcon />
                </Fab>
                <Typography variant="h4" id="your-list-text">Your Lists</Typography>
            </div>
        </div>)
}

export default HomeScreen;