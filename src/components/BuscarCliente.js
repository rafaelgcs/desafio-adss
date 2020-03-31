import React, { useState } from 'react';
import { Box, Collapse, IconButton, Typography, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { TextInput } from "./MaskedInput";

import CloseIcon from '@material-ui/icons/Close';

import Input from '@material-ui/core/Input';
import api from '../services/api';

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

const alerts = [
    "Nenhum usuário foi encontrado com esse CPF!"
];

const BuscarCliente = (props) => {
    const [requestValue, setRequestValue] = useState();
    const [_showClientSelected, setShowClientSelected] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [user, setUser] = useState();
    const [_selectedClient, setSelectedClient] = useState(false);
    const classes = useStyles();

    const handleChangeRequestValue = (event) => {
        setShowAlert(false);
        setAlertMessage("");
        setRequestValue(event.target.value);
    }

    const handleClickSelectClient = async () => {
        const selectedData = localStorage.getItem('@credfica:app-selectedTaxa');
        let jsonSelectData = JSON.parse(selectedData);
        // selectedData.
        jsonSelectData.cliente = user;
        console.log(selectedData)
        localStorage.setItem('@credfica:app-selectedTaxa', JSON.stringify(jsonSelectData));
        setSelectedClient(true);

    }

    const handleCancelSelectClient = () => {
        setSelectedClient(false);
        setShowClientSelected(false);
    }

    const handleClickButton = () => {
        setShowAlert(false);
        setAlertMessage("");
        if (requestValue != null && requestValue !== "") {
            searchClient();
        }
    }


    const searchClient = async () => {
        setShowClientSelected(false);
        const response = await api.get(`/clientes/?cpf=${requestValue}`);

        if (response.status === 200 || response.status === 304) {
            console.log(typeof response.data);
            if (response.data.length !== 0) {
                setUser(response.data[0]);
                setTimeout(() => {
                    setShowClientSelected(true);
                }, 200);
            } else {
                setAlertMessage(alerts[0]);
                setShowAlert(true);
            }
        } else {
            console.log("Error");
        }
    }

    return (
        <>
            <Box display="flex" p={1} justifyContent="center">
                <Typography variant="h5" className={classes.textBlue}>
                    Busque o Cliente
                </Typography>
            </Box>
            <Collapse in={showAlert} style={{ paddingBottom: 5 }}>
                <Alert
                    severity="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setShowAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {alertMessage}
                </Alert>
            </Collapse>
            <Box display="flex" justifyContent="center">
                <Box p={1} bgcolor="grey.300" >
                    <Input value={requestValue} inputComponent={TextInput} placeholder="CPF do Cliente" onChange={handleChangeRequestValue} />
                </Box>
                <Box>
                    <BlueButton onClick={handleClickButton} className={classes.buttonSearch}>Buscar</BlueButton>
                </Box>
            </Box>

            {
                _showClientSelected && <Box display="flex" p={1} justifyContent="center">
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
                        {
                            _selectedClient ?
                                <Box display="flex">
                                    <Button fullWidth onClick={handleCancelSelectClient} style={{ marginRight: 10 }}>Cancelar</Button>
                                    <Link to="/select-type" style={{ textDecoration: 'none' }}>
                                        <BlueButton fullWidth>Avançar</BlueButton>
                                    </Link>
                                </Box>
                                : <Box>
                                    <BlueButton onClick={handleClickSelectClient} fullWidth>Selecionar</BlueButton>
                                </Box>
                        }
                    </Box>
                </Box>
            }
        </>
    );
}

export default BuscarCliente;