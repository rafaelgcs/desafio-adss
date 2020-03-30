import React, { useState } from 'react';
import { Box, ExpansionPanel, ExpansionPanelSummary, FormControlLabel, Radio, RadioGroup, Checkbox, ExpansionPanelDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputBase, TextField, AppBar, Toolbar, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Menu, MenuItem, Button, Container } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import api from '../services/api';


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

function createData(parcela, juros, valor, total, comissao) {
    return { parcela, juros, valor, total, comissao };
}

const rows = [
    createData(1, 15, 1150, 1150, 30),
    createData(2, 30, 650, 1300, 40),
    createData(3, 32, 440, 1320, 50),
    createData(4, 34, 335, 1340, 60),
    createData(5, 36, 272, 1350, 70),
];

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#F8F8F8',
        color: '#777777',
        fontSize: 20
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const OrangeRadio = withStyles({
    root: {
        '&$checked': {
            color: "#EF9C4B",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


const SelectValue = () => {
    const [requestValue, setRequestValue] = useState(0.0);
    const [loadedTable, setLoadedTable] = useState(false);
    const [selectedTable, setSelectedTable] = useState();
    const [selectedPanel, setSelectedPanel] = useState();
    const [tables, setTables] = useState([]);
    const classes = useStyles();

    const handleClickButton = () => {
        // setLoadedTable(!loadedTable);
        // console.log(`Testando: ${loadedTable}`);
        // let nTables = tables;
        // nTables.push({ title: "Tabela Padrão" });
        // setTables(nTables);
        searchTable();
    }

    const searchTable = async () => {
        const response = await api.get('/tables');

        console.log(response.status);
        if (response.status == 200) {
            console.log("OK");
            setTables(response.data);
            console.log(tables);
        } else {
            console.log("Error")
        }
    }

    const handleChangeSelectedTable = (change) => {
        console.log(change)
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
            {/* {loadedTable ?? */}
            <RadioGroup aria-label="table" name="table" value={selectedPanel} onChange={(e) => handleChangeSelectedTable(e.target.value)}>
                {
                    tables.map((item, index) => {
                        console.log(item);
                        return (
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-label="Expand"
                                    aria-controls="additional-actions1-content"
                                    id="additional-actions1-header"
                                >
                                    <FormControlLabel
                                        color="#EF9C4B"
                                        aria-label="Acknowledge"
                                        value={`${index}-table`}
                                        // onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<OrangeRadio />}
                                        label={item.title}
                                    />
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Box>
                                        {/* <TableContainer component={Paper}> */}
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">Parcela</StyledTableCell>
                                                    <StyledTableCell align="center">Juros da Parcela</StyledTableCell>
                                                    <StyledTableCell align="center">Valor da Parcela</StyledTableCell>
                                                    <StyledTableCell align="center">Valor Total</StyledTableCell>
                                                    <StyledTableCell align="center">Comissão Parceiro</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {item.rows.map((row) => (
                                                    // <StyledTableRow key={`${item.title}-${row.parcela}`}>
                                                    <TableSortLabel
                                                        active={orderBy === headCell.id}
                                                        direction={orderBy === headCell.id ? order : 'asc'}
                                                        onClick={createSortHandler(headCell.id)}
                                                    >

                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {row.parcela}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{row.juros}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.valor}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.total}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.comissao}</StyledTableCell>
                                                    </TableSortLabel>
                                                    // </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        {/* </TableContainer> */}
                                    </Box>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                        )
                    })
                }
            </RadioGroup>

        </>
    );
}

export default SelectValue;