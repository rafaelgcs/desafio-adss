import React from 'react';
import { makeStyles, AppBar, Toolbar, Box, Typography, Button } from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: '#228A95',
        color: 'white'
    },
    grow: {

        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center'
    },
    textArea: {
        paddingRight: 10,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

const BottomNavbar = (props) => {
    const classes = useStyles();
    // const openDropdownMenu = Boolean(anchorEl);
    const title = props.tableName;
    const parcelas = props.numberParcelas;
    const valor = props.parcelaValue;
    const onCancelButton = props.onCancelButton;
    const onNextButton = props.onNextButton;
    const onNextLink = props.onNextLink;

    return (
        <>
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar>

                    <Box display="flex" p={1} justifyContent="center" className={classes.grow}>
                        <Typography variant="p" className={classes.textArea}>
                            <b>Nome:</b> {title}
                        </Typography>
                        <Typography variant="p" className={classes.textArea}>
                            <b>Parcelas:</b> {parcelas}
                        </Typography>
                        <Typography variant="p" className={classes.textArea}>
                            <b>Valor da Parcela:</b> {parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                    </Box>
                    <Button style={{ marginRight: 6, color: "white" }} onClick={() => onCancelButton()}>
                        {/* <MoreIcon /> */}
                        <Typography variant="p">
                            Cancelar
                        </Typography>
                    </Button>
                    <Link to={onNextButton ? onNextLink : ""} style={{textDecoration:'none'}}>
                        <Button style={{ backgroundColor: "#EF9C4B", color: "white"}}>
                            {/* <MoreIcon /> */}
                            <Typography variant="p">
                                Avançar
                        </Typography>
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default BottomNavbar;