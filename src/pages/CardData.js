import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AllInboxIcon from '@material-ui/icons/AllInbox';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import CreditCard from '../components/CreditCard';

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

const CardData = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Navbar />
            <Container maxWidth="md">
                <Header title="Solicitar Empréstimo" icon={AllInboxIcon} />
                <CreditCard />
            </Container>
        </div>
    );
}

export default CardData;