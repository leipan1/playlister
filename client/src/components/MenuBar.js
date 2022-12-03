import { useContext, useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MenuBar(){

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen=(event)=>{
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sortMenu= 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>Name(A-Z)</MenuItem>
            <MenuItem>Publish Date(Newest)</MenuItem>
            <MenuItem>Listens(High-Low)</MenuItem>
            <MenuItem>Likes(High-Low)</MenuItem>
            <MenuItem>Dislikes(High-Low)</MenuItem>
        </Menu>

    return(
        <div id="menu-bar">
            <div id="menu-bar-icons">
                <HomeIcon
                    fontSize='inherit'
                />
                <GroupsIcon
                    fontSize='inherit'
                />
                <PersonIcon
                    fontSize='inherit'
                />
            </div>
            <input id="menu-bar-search-bar" type="text" placeholder="Search"/>
            <div id="menu-bar-sort">
                <p style={{ fontSize: '15pt', marginRight:'10px'}}>SORT BY</p>
                <div id="menu-bar-sort-icon">
                    <SortIcon
                        fontSize='inherit'
                        onClick={handleSortMenuOpen}
                    />
                </div>
            </div>
            {
                sortMenu
            }
        </div>
    );
}