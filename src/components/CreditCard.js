import React, { useState, useEffect } from 'react';
import { Box, ExpansionPanelSummary, ExpansionPanel, ExpansionPanelDetails, TextField, Typography, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { CardInput, VencimentoInput, CodSegurancaInput } from "./MaskedInput";
import { Dropzone } from 'easy-react-dropzone';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Input from '@material-ui/core/Input';
// import api from '../services/api';

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


const CreditCard = (props) => {
    const [enabledButton, setEnabledButton] = useState(false);
    const [nameCard, setNameCard] = useState("");
    const [numberCard, setNumberCard] = useState("");
    const [vencimentoCard, setVencimentoCard] = useState("");
    const [codSegCard, setCodSegCard] = useState("");
    const classes = useStyles();
    const [frenteFiles, setFrenteFiles] = useState([]);
    const [versoFiles, setVersoFiles] = useState([]);
    const [selfieFiles, setSelfieFiles] = useState([]);

    useEffect(() => {
        if (nameCard !== "" && nameCard != null && numberCard !== "" && vencimentoCard !== "" && codSegCard !== "" && codSegCard !== undefined) {
            setEnabledButton(true);
        }
    },[enabledButton,codSegCard, nameCard, numberCard, vencimentoCard]);

    return (
        <>
            <Box display="flex" pt={4} p={1} justifyContent="center">
                <Box style={{ flex: 1 }}>
                    <Box pb={3}>
                        <Typography variant="p" className={classes.textBlue}>
                            Faça o upload dos anexos do cartão:
                        </Typography>
                    </Box>
                    <Box p={1} bgcolor="grey.300" >
                        <TextField fullWidth value={nameCard} placeholder="Nome no Cartão" onChange={(e) => setNameCard(e.target.value)} />
                        {/* <Input value={nameCard} inputComponent={NormalInput} placeholder="Nome no Cartão" onChange={(e) => setNameCard(e.target.value)} /> */}
                    </Box>
                    <Box p={1} bgcolor="grey.300" >
                        <Input fullWidth value={numberCard} inputComponent={CardInput} placeholder="Número do Cartão" onChange={(e) => setNumberCard(e.target.value)} />
                    </Box>
                    <Box display="flex" style={{ width: '100%' }}>
                        <Box p={1} bgcolor="grey.300" >
                            <Input fullWidth value={vencimentoCard} inputComponent={VencimentoInput} placeholder="Vencimento" onChange={(e) => setVencimentoCard(e.target.value)} />
                        </Box>
                        <Box p={1} bgcolor="grey.300" >
                            <Input fullWidth value={codSegCard} inputComponent={CodSegurancaInput} placeholder="Cod. Segurnaça" onChange={(e) => setCodSegCard(e.target.value)} />
                        </Box>
                    </Box>
                </Box>
                <Box style={{ flex: 1 }}>
                    <Box pb={3}>
                        <Typography variant="p" className={classes.textBlue}>
                            Faça o upload dos anexos do cartão:
                        </Typography>
                    </Box>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Cartão de Crédito (FRENTE)</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Dropzone
                                textDropzone="Clique aqui ou arraste o arquivo aqui..."
                                fileExtensions={['png', 'jpg', 'jpeg', 'pdf']}
                                defaultValue={frenteFiles}
                                onChange={(selectedFiles) => setFrenteFiles(selectedFiles)}
                            />
                            {/* <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography> */}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Cartão de Crédito (VERSO)</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Dropzone
                                textDropzone="Clique aqui ou arraste o arquivo aqui..."
                                fileExtensions={['png', 'jpg', 'jpeg', 'pdf']}
                                defaultValue={versoFiles}
                                onChange={(selectedFiles) => setVersoFiles(selectedFiles)}
                            />
                            {/* <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography> */}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Selfie com Cartão de Crédito</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Dropzone
                                textDropzone="Clique aqui ou arraste o arquivo aqui..."
                                fileExtensions={['png', 'jpg', 'jpeg', 'pdf']}
                                defaultValue={selfieFiles}
                                onChange={(selectedFiles) => setSelfieFiles(selectedFiles)}
                            />
                            {/* <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography> */}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center">
                <Link to={enabledButton && "/"} style={{ color: 'white', textDecoration: 'none' }}>
                    <BlueButton size="large" fullWidth disabled={!enabledButton} >Continuar</BlueButton>
                </Link>
            </Box>
        </>
    );
}

export default CreditCard;