import React from 'react';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

export const Back = (props) => {
    let navigate = useNavigate();
    return(
        <Button variant="secondary" onClick={() => { navigate(-1); }}> { props.name === undefined ? "Retour ? la page de visualisation des d?partements" :
        'Retour ? la page de visualisation des '+ props.name } </Button>
    );
}