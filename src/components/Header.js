import React, { useState } from 'react';
import { makeStyles, Box, AppBar, Toolbar, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Menu, MenuItem, Button, Container } from '@material-ui/core';
// import * as Colors from '@material-ui/styles/colors';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from '@material-ui/styles/getMuiTheme';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AllInboxIcon from '@material-ui/icons/AllInbox';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        paddingTop: 20,
    },
    headerIcons: {

    },
    textOrange: {
        color: '#EF9C4B',
    },
    textBlue: {
        color: '#228A95'
    }
}));

export default function Header(props) {
    const classes = useStyles();
    // const title = props

    return (
        <div className={classes.header}>
            <Box display="flex"
                alignItems="center"
                bgcolor="background.paper">
                <Box>
                    <AddCircleIcon className={classes.textBlue} />
                </Box>
                <Box>
                    <props.icon className={classes.textOrange} style={{ fontSize: 60 }} />
                </Box>
                <Box>
                    <Typography variant="h5" className={classes.textBlue} style={{ maxWidth: 100 }}>
                        {props.title}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}
