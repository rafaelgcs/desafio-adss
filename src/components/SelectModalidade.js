import React, { useState } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


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

const DisabledButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#bfbfbf'),
        backgroundColor: '#bfbfbf',
        '&:hover': {
            backgroundColor: '#bfbfbf',
        },
    },
}))(Button);

const SelectModalidade = (props) => {
    const [loadedTable, setLoadedTable] = useState(false);
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
                <Box>
                    <Box>
                        <Typography variant="h5" className={classes.textBlue}>
                            Escolha a Modalidade
                        </Typography>
                    </Box>
                    <Box pt={5}>
                        <Link to="/credit-data" style={{ textDecoration: 'none' }}>
                            <BlueButton fullWidth size="large" onClick={handleClickButton}>Cartão de Crédito</BlueButton>
                        </Link>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Typography variant="p" align="center">
                            ou
                        </Typography>
                    </Box>
                    <Box>
                        {/* <Link to="/"> */}
                        <DisabledButton disabled fullWidth size="large" onClick={handleClickButton}>Crédito Consignado</DisabledButton>
                        {/* </Link> */}
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Typography variant="p" align="center" style={{color: '#bfbfbf'}}>
                            Em breve
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default SelectModalidade;