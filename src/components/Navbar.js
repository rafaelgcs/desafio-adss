import React from 'react';
import { makeStyles, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Menu, MenuItem, Button } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import StyleIcon from '@material-ui/icons/Style';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        // alignItems: 'center',
        backgroundColor: '#228A95',
        color: 'white',
    },
    appbar_center: {
        width: '96%',
        alignItems: 'space-between',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    centering:{
        flexGrow: 1,
    },
    title: {
        
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [enableDrawer, setEnableDrawer] = React.useState(false);
    const openDropdownMenu = Boolean(anchorEl);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setEnableDrawer(open)
    };

    const list = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button key="start-request">
                    <ListItemIcon><StyleIcon></StyleIcon></ListItemIcon>
                    <ListItemText primary="Simulação de Taxas" />
                </ListItem>
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))} */}
            </List>
            {/* <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </div>
    );

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar className={classes.appbar}
                color="default"
                position="static">
                <Toolbar>
                    <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.centering}>
                        <Typography variant="h6" className={classes.title}>
                            CredFica
                        </Typography>
                    </div>
                    <div>

                        <Button
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(handleMenu)}
                            color="inherit"
                        >
                            <Typography variant="p" style={{ paddingRight: 5 }}>
                                Master
                            </Typography>
                            <AccountCircle />
                        </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={openDropdownMenu}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <React.Fragment key="drawer-left">
                <Drawer anchor="left" open={enableDrawer} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </>
    );
};

export default Navbar;