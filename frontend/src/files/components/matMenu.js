import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export default function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color='warning'
            >
                More Options
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                <MenuItem><a href="/allBookings" className="a-link margin-auto" style={{ textDecoration: "none", color:"white" }}>
                    <div>View All Bookings</div>
                </a></MenuItem>
                <MenuItem><a href="/allTrains" className="a-link margin-auto" style={{ textDecoration: "none", color:"white" }}>
                    <div>View All Trains</div>
                </a></MenuItem>
                <MenuItem><a href="/deleteTrain" className="a-link margin-auto" style={{ textDecoration: "none", color:"white" }}>
                    <div>Delete Train</div>
                </a></MenuItem>
                <MenuItem><a href="/addTrain" className="a-link margin-auto" style={{ textDecoration: "none", color:"white" }}>
                    <div>Add Train</div>
                </a></MenuItem>
            </Menu>
        </div>
    );
}