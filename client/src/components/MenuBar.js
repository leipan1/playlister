import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';

export default function MenuBar(){

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
                <SortIcon
                    fontSize='inherit'
                />
            </div>
        </div>
    );
}