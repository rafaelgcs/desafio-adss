import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, ExpansionPanel, Tooltip, Collapse, ExpansionPanelSummary, FormControlLabel, Radio, RadioGroup, ExpansionPanelDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Paper, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { withStyles, lighten, makeStyles, useTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import api from '../services/api';

//Icons
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CloseIcon from '@material-ui/icons/Close';

const OrangeRadio = withStyles({
    root: {
        '&$checked': {
            color: "#EF9C4B",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
    { id: 'parcela', numeric: false, disablePadding: true, label: 'Parcela' },
    { id: 'juros', numeric: true, disablePadding: true, label: 'Juros da Parcela' },
    { id: 'valor', numeric: true, disablePadding: false, label: 'Valor Parcela' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Valor Total' },
    { id: 'comissao', numeric: true, disablePadding: false, label: 'Comissão' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        // padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        Carrinho
                    </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: '100%',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const errors = [
    "O valor desejado precisa ser superior a R$300,00",
    "O valor desejado precisa ser inferior a R$10.000,00"
]

const SelectValue = (props) => {
    const classes = useStyles();
    const [requestValue, setRequestValue] = useState(0.0);
    const [_showTables, setShowTables] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [selectedPanel, setSelectedPanel] = useState();
    const [tables, setTables] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const onGenerateTables = props.onGenerateTables;
    const onSelectedTable = props.onSelectedTable;
    const onSelectedRow = props.onSelectedRow;

    const handleClickButton = () => {
        setShowError(false);
        if (requestValue < 300) {
            setErrorMessage(errors[0]);
            setShowError(true);
        }
        else if (requestValue > 10000) {
            setErrorMessage(errors[1]);
            setShowError(true);
        } else {
            searchTable();
        }

    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        const itens = name.split('-');
        const selectedTable = tables[itens[1]];
        const selectedRow = selectedTable.rows[itens[0]];
        onSelectedTable(selectedTable);
        onSelectedRow(selectedRow, selectedTable);
        setSelectedPanel(`${itens[1]}-table`);

        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const searchTable = async () => {
        setShowTables(false);
        const response = await api.get('/tables');

        if (response.status === 200 || response.status === 304) {
            console.log(response)
            setTables(response.data);
            onGenerateTables(true);
            setTimeout(() => {
                setShowTables(true);
            }, 200);
        } else {
            console.log("Error");
            onGenerateTables(false);
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
            <Collapse in={showError} style={{ paddingBottom: 5 }}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setShowError(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {errorMessage}
                </Alert>
            </Collapse>
            <Box display="flex" justifyContent="center">
                <Box p={1} bgcolor="grey.300" >
                    <CurrencyTextField
                        variant="standard"
                        value={requestValue}
                        currencySymbol="R$"
                        outputFormat="number"
                        decimalCharacter=","
                        digitGroupSeparator="."
                        onChange={(event, value) => { if (showError) { setShowError(false) } setRequestValue(value) }}
                    />
                </Box>
                <Box paddingLeft={5}>
                    <Button onClick={handleClickButton} style={{ backgroundColor: "#EF9C4B", color: "white", height: '100%' }}>Calcular</Button>
                </Box>
            </Box>
            {
                _showTables && <RadioGroup aria-label="table" name="table" value={selectedPanel} onChange={(e) => handleChangeSelectedTable(e.target.value)}>
                    {
                        tables.map((item, tableIndex) => {
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
                                            value={`${tableIndex}-table`}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={<OrangeRadio />}
                                            label={item.title}
                                        />
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Paper className={classes.paper}>
                                            <TableContainer>
                                                <Table
                                                    className={classes.table}
                                                    aria-labelledby="tableTitle"
                                                    size={dense ? 'small' : 'medium'}
                                                    aria-label="enhanced table"
                                                >
                                                    <EnhancedTableHead
                                                        classes={classes}
                                                        order={order}
                                                        orderBy={orderBy}
                                                        onRequestSort={handleRequestSort}
                                                        rowCount={item.rows.length}
                                                    />
                                                    <TableBody>
                                                        {stableSort(item.rows, getSorting(order, orderBy))
                                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            .map((row, index) => {
                                                                const isItemSelected = isSelected(row.parcela);
                                                            
                                                                return (
                                                                    <TableRow
                                                                        hover
                                                                        onClick={event => { handleClick(event, `${index}-${tableIndex}`); }}
                                                                        role="radio"
                                                                        tabIndex={-1}
                                                                        key={`${row.parcela}-${item.id}`}
                                                                        selected={isItemSelected}
                                                                    >
                                                                        <TableCell align="center">
                                                                            {row.parcela}
                                                                        </TableCell>
                                                                        <TableCell align="center">{parseFloat(row.juros).toLocaleString('pt-BR', { style: 'percent', currency: 'BRL' })}</TableCell>
                                                                        <TableCell align="center">{parseFloat(row.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                                                                        <TableCell align="center">{parseFloat(row.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                                                                        <TableCell align="center">{parseFloat(row.comissao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                                                                    </TableRow>
                                                                );
                                                            })}
                                                        {emptyRows > 0 && (
                                                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                                <TableCell colSpan={6} />
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                                                colSpan={3}
                                                count={rows.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: { 'aria-label': 'Itens' },
                                                    native: true,
                                                }}
                                                labelRowsPerPage='Itens'
                                                labelDisplayedRows={
                                                    ({ from, to, count }) => {
                                                        return '' + from + '-' + to + ' de ' + count
                                                    }
                                                }
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}

                                            />
                                        </Paper>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })
                    }
                </RadioGroup>
            }

        </>
    );
}

export default SelectValue;