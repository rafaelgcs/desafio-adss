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
import { TextInput } from "./MaskedInput";

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import clsx from 'clsx';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import StyleIcon from '@material-ui/icons/Style';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputMask from 'react-input-mask'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
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
    textBlueBold: {
        fontWeight: 'bold',
        color: '#228A95'
    },
    inputCenter: {
        textAlign: 'center',
        border: 'none'
    },
    table: {
        minWidth: 700,
    },
    buttonSearch: {
        backgroundColor: "#228A95",
        color: "white",
        height: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        MozBorderRadiusTopleft: 0,
        MozBorderRadiusBottomleft: 0,
    },
    titleCardCliente: {
        fontWeight: 'bold',
        color: '#919191'
    }
}));

const BlueButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#228A95'),
        backgroundColor: '#228A95',
        '&:hover': {
            backgroundColor: '#165c63',
        },
    },
}))(Button);

const SelectModalidade = (props) => {
    const [requestValue, setRequestValue] = useState();
    const [loadedTable, setLoadedTable] = useState(false);
    const [user, setUser] = useState({ cpf: "123.456.789-10", name: "Usuário Teste" });
    const [tables, setTables] = useState([]);
    const classes = useStyles();

    const [values, setValues] = React.useState({
        textmask: '(1  )    -    ',
        numberformat: '1320',
    });

    const handleChangeRequestValue = (event) => {
        setRequestValue(event.target.value);
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleClickButton = () => {
        setLoadedTable(!loadedTable);
        console.log(`Testando: ${loadedTable}`);
        let nTables = tables;
        nTables.push({ title: "Tabela Padrão" });
        setTables(nTables);
    }

    return (
        <>
            <Box display="flex" p={1} justifyContent="center">
                <Typography variant="h5" className={classes.textBlue}>
                    Escolha a Modalidade
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
                <Box p={1} bgcolor="grey.300" >
                    <Input value={requestValue} inputComponent={TextInput} placeholder="CPF do Cliente" onChange={handleChangeRequestValue} />
                </Box>
                <Box>
                    <BlueButton onClick={handleClickButton} className={classes.buttonSearch}>Buscar</BlueButton>
                </Box>
            </Box>

            <Box display="flex" p={1} justifyContent="center">
                <Box p={1} bgcolor="grey.300" >
                    <Box mb={1} display="flex" paddingLeft={8} paddingRight={8} justifyContent="center">
                        <Typography variant="p" className={classes.titleCardCliente}>
                            Cliente Encontrado:
                    </Typography>
                    </Box>
                    <Box display="flex" mb={1} p={1} justifyContent="center">
                        <Typography variant="p" className={classes.textOrange}>
                            {user.cpf}
                        </Typography>
                    </Box>
                    <Box display="flex" mb={1} p={1} justifyContent="center">
                        <Typography variant="p" className={classes.textBlueBold}>
                            {user.name}
                        </Typography>
                    </Box>
                    <Box>
                        <BlueButton onClick={handleClickButton} fullWidth>Selecionar</BlueButton>
                    </Box>
                </Box>

            </Box>
        </>
    );
}

export default SelectModalidade;