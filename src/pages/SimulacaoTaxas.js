import React, { useState } from 'react';
import { Container, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AllInboxIcon from '@material-ui/icons/AllInbox';

import Navbar from '../components/Navbar';
import BottomNavbar from '../components/BottomNavBar';
import Header from '../components/Header';

import SelectTable from '../components/SelectTable';

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

const SimulacaoTaxas = (props) => {
    const [_showBottomNavbar, SetshowBottomNavbar] = useState();
    const [selectedTable, setSelectedTable] = useState({});
    const [selectedRow, setSelectedRow] = useState({});
    const classes = useStyles();

    const onGenerateTables = (e) => {

    }

    const onSelectedTable = (table) => {
        setSelectedTable(table);
    }
    const onSelectedRow = async (row, table) => {
        SetshowBottomNavbar(false);
        setTimeout(() => {
            setSelectedRow(row);
            SetshowBottomNavbar(true);
            saveData(row, table);
        }, 200);
    }


    const saveData = (row, table) => {
        let selectedData = {
            table: table,
            parcela: row
        };
        console.log(selectedData);
        localStorage.setItem('@credfica:app-selectedTaxa', JSON.stringify(selectedData));
    }


    const cancelSimulacao = () => {
        SetshowBottomNavbar(false);
        setTimeout(() => {
            setSelectedTable({});
            setSelectedRow({});
        }, 200);
    }

    const selecionarTaxa = () => {
        let selectedData = {
            table: selectedTable,
            parcela: selectedRow
        };
        console.log(selectedData);
        localStorage.setItem('@credfica:app-selectedTaxa', JSON.stringify(selectedData));
        if (enableRedirect) {
            return true;
        }
        return false;
    }

    const enableRedirect = () => {
        if (selectedTable !== {} && selectedTable !== {}) {
            return true;
        }
        return false;
    }

    return (
        <div className={classes.root}>
            <Navbar />
            <Container maxWidth="md">
                <Header title="Simulação de Taxas" icon={AllInboxIcon} />
                <SelectTable
                    onSelectedRow={(row,table) => onSelectedRow(row,table)}
                    onSelectedTable={(table) => onSelectedTable(table)}
                    onGenerateTables={(e) => onGenerateTables(e)} />
            </Container>
            <Collapse in={_showBottomNavbar}>
                <BottomNavbar
                    onNextLink="/select-client"
                    onNextButton={() => selecionarTaxa()}
                    onCancelButton={() => cancelSimulacao()}
                    tableName={selectedTable.title}
                    numberParcelas={selectedRow.parcela}
                    parcelaValue={selectedRow.valor} />
            </Collapse>
        </div>
    );
}

export default SimulacaoTaxas;