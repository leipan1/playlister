import React, { useContext, useEffect, useState } from 'react'
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
    const [loadPlaylist,setLoadPlaylist]=useState(false)
    const [currentSong,setCurrentSong]=useState(0)
    let playlist=[]
    let currentEvent=null;

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function loadAndPlayCurrentSong(player) {
        playlist=store.songList
        let song = playlist[currentSong];
        player.loadVideoById(song.youTubeId);
        player.playVideo();
    }

    function incSong(event) {
        let num=currentSong+1
        num=num%playlist.length
        setCurrentSong(num)
    }
    function decSong(event) {
        let num=currentSong-1
        if(num<0){
            num=playlist.length-1
        }
        setCurrentSong(num)
    }

    function onPlayerReady(event) {
        currentEvent=event.target
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        // let playerStatus = event.data;
        // let player = event.target;
        // if (playerStatus === -1) {
        //     // VIDEO UNSTARTED
        //     console.log("-1 Video unstarted");
        // } else if (playerStatus === 0) {
        //     // THE VIDEO HAS COMPLETED PLAYING
        //     console.log("0 Video ended");
        //     incSong();
        //     loadAndPlayCurrentSong(player);
        // } else if (playerStatus === 1) {
        //     // THE VIDEO IS PLAYED
        //     console.log("1 Video played");
        // } else if (playerStatus === 2) {
        //     // THE VIDEO IS PAUSED
        //     console.log("2 Video paused");
        // } else if (playerStatus === 3) {
        //     // THE VIDEO IS BUFFERING
        //     console.log("3 Video buffering");
        // } else if (playerStatus === 5) {
        //     // THE VIDEO HAS BEEN CUED
        //     console.log("5 Video cued");
        // }
    }
    // function handleTriggerYoutubePlayer(event){
    //     console.log("YOUTUBER PLAYER SHOULD WORK")
    //     console.log("was playlist loaded?::"+loadPlaylist)
    //     setCurrentSong(0)
    //     setLoadPlaylist(!loadPlaylist)
    // }

    const handleTriggerYoutubePlayer=()=>{
        console.log("YOUTUBER PLAYER SHOULD WORK")
        console.log("was playlist loaded?::"+loadPlaylist)
        setCurrentSong(0)
        setLoadPlaylist(!loadPlaylist)
    }

    function handlePlay(){
        console.log("PLAY BUTTON")
        console.log(currentEvent)
        currentEvent.playVideo();
    }
    function handlePause(){
        currentEvent.pauseVideo();
    }


    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }} 
                // onClick={handleTriggerYoutubePlayer}
            >
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        triggerYTPlayer={handleTriggerYoutubePlayer}
                    />
                ))
            }
            </List>;
    }

    const opts = {
        height: '320',
        width: '480',
    };

    
    let rightside=
        <div id="playlist-selector-right">
            <div id="playlist-selector-right-tabs">
                <button id="playlist-selector-right-tabs-button">Player</button>
                <button id="playlist-selector-right-tabs-button">Comments</button>
            </div>
            <div id="youtube-player">
                <Youtube 
                    videoId={playlist[currentSong]} 
                    opts={opts}
                    // onReady={onPlayerReady}
                    // onStateChange={onPlayerStateChange}
                >
            
                </Youtube>
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
    

    if(loadPlaylist===true && store.songList && store.currentList && store.currentList.songs.length>0){
        playlist=store.songList
        rightside=
            <div id="playlist-selector-right">
                <div id="playlist-selector-right-tabs">
                    <button id="playlist-selector-right-tabs-button">Player</button>
                    <button id="playlist-selector-right-tabs-button">Comments</button>
                </div>
                <div id="youtube-player">
                    <Youtube 
                        videoId={playlist[currentSong].youTubeId} 
                        opts={opts}
                        onReady={onPlayerReady}
                        onStateChange={onPlayerStateChange}
                    >
                
                    </Youtube>
                </div>
                <div id="youtuber-player-status">
                    Now Playing
                    <table id="youtuber-player-status-grid">
                        <td>Playlist: {store.currentList.name}</td>
                        <td>Song: #{currentSong+1}</td>
                        <td>Title: {playlist[currentSong].title}</td>
                        <td>Artist: {playlist[currentSong].artist}</td>
                    </table>
                    <div id="youtuber-player-status-options">
                        <FastRewindIcon
                            onClick={decSong}
                            fontSize='inherit'
                        />
                        <StopIcon
                            onClick={handlePause}
                            fontSize='inherit'
                        />
                        <PlayArrowIcon
                            onClick={handlePlay}
                            fontSize='inherit'
                        />
                        <FastForwardIcon
                            onClick={incSong}
                            fontSize='inherit'
                        />
                    </div>
                </div>
            </div>
    }



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
                {rightside}
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