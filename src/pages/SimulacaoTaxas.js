import React, { useState } from 'react';
import { Box, ExpansionPanel, ExpansionPanelSummary, FormControlLabel, Radio, RadioGroup, Checkbox, ExpansionPanelDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputBase, TextField, AppBar, Toolbar, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Menu, MenuItem, Button, Container } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import * as Colors from '@material-ui/styles/colors';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from '@material-ui/styles/getMuiTheme';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import clsx from 'clsx';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import StyleIcon from '@material-ui/icons/Style';
import Navbar from '../components/Navbar';
import BottomNavbar from '../components/BottomNavBar';
import Header from '../components/Header';

import SelectValue from '../components/SelectValue';
import SelectTable from '../components/SelectTable';
import BuscarCliente from '../components/BuscarCliente';
// import AppBar from '@material-ui/core/AppBar';

// import { Container } from './styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        paddingTop: 20,
    },
    headerIcons: {

    },
    titleTable: {
        color: '#228A95',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    textOrange: {
        color: '#EF9C4B',
    },
    textBlue: {
        color: '#228A95'
    },
    inputCenter: {
        textAlign: 'center',
        border: 'none'
    },
    table: {
        minWidth: 700,
    },
}));

const SimulacaoTaxas = () => {
    const [requestValue, setRequestValue] = useState(0.0);
    const [loadedTable, setLoadedTable] = useState(false);
    const [selectedTable, setSelectedTable] = useState();
    const [selectedPanel, setSelectedPanel] = useState();
    const [tables, setTables] = useState([]);
    const classes = useStyles();

    const handleClickButton = () => {
        setLoadedTable(!loadedTable);
        console.log(`Testando: ${loadedTable}`);
        let nTables = tables;
        nTables.push({ title: "Tabela Padrão" });
        setTables(nTables);
    }

    const handleChangeSelectedTable = (change) => {
        console.log(change)
    }

    return (
        <div className={classes.root}>
            <Navbar />
            <Container maxWidth="md">
                <Header title="Simulação de Taxas" icon={AllInboxIcon} />
                <SelectTable />
                {/* <SelectValue /> */}
                {/* <BuscarCliente /> */}

            </Container>
            <BottomNavbar />
        </div>
    );
}

export default SimulacaoTaxas;