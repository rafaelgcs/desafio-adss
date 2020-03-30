import React, { useState } from 'react';
import { Box, ExpansionPanel, ExpansionPanelSummary, FormControlLabel, Radio, RadioGroup, Checkbox, ExpansionPanelDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputBase, TextField, AppBar, Toolbar, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Menu, MenuItem, Button, Container } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

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

const SelectValue = () => {
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
    return (
        <>
            <Box display="flex" p={1} justifyContent="center">
                <Typography variant="h5" className={classes.textBlue}>
                    Valor Desejado
                    </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
                <Box p={1} bgcolor="grey.300" >
                    <CurrencyTextField
                        variant="standard"
                        value={requestValue}
                        currencySymbol="R$"
                        //minimumValue="0"
                        outputFormat="number"
                        decimalCharacter=","
                        digitGroupSeparator="."
                        onChange={(event, value) => setRequestValue(value)}
                    />
                </Box>
                <Box paddingLeft={5}>
                    <Button onClick={handleClickButton} style={{ backgroundColor: "#EF9C4B", color: "white", height: '100%' }}>Calcular</Button>
                </Box>
            </Box>
        </>
    );
}

export default SelectValue;