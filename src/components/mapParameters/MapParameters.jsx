import React, {useContext} from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import './MapParameters.css';
import {FilterModel} from "../model/filterModel";
import {FilterContext} from "../../contexts/FilterContext";
import {Form, Button, Row, Col} from 'react-bootstrap';

export default function MapParameters(props){
    const [road, setRoad] = useState("");
    const [price, setPrice] = useState(0);
    const [fuel, setFuel] = useState("");
    const [limit, setLimit] = useState();

    const navigate = useNavigate();
    const filterContext = useContext(FilterContext);

    const search = () => {
        let filter = new FilterModel(limit, road, price, fuel);
        filter.checkFilters()
        filterContext.updateFilter(filter);
    }

    const clear = () => {
        setLimit(0);
        setRoad("");
        setPrice(0);
        setFuel("");
        let filter = new FilterModel();
        filterContext.updateFilter(filter);
    }

    return (
        <div id="parameters" className="w-100">
            <h2 id="title-filter">Filtres</h2>
            <Form className="form">
                {(window.location.href.includes('map'))?
                    <></>:
                    <Form.Group>
                        <Form.Label>Limite de résultats : </Form.Label>
                        <Form.Control min="0" className="form-input" type="number" value={limit} onChange={(e) => setLimit(e.target.value)}/>
                    </Form.Group>
                }
                
                <Form.Group>
                    <Form.Label>Type de station : </Form.Label>
                    <Form.Select value={road} onChange={(e) => setRoad(e.target.value)}>
                        <option value="">--------</option>
                        <option value="A">Station d'autoroute</option>
                        <option value="R">Station standard</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prix (€) : </Form.Label>
                    {(fuel != "")?
                    <Form.Control min="0" className="form-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>:
                    <Form.Control min="0" className="form-input" type="text"  disabled="disabled" value="Veuillez sélectionner un type de carburant"/>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type d'essence : </Form.Label>
                    <Form.Select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                        <option value="">--------</option>
                        <option value="SP98">SP98</option>
                        <option value="SP95">SP95</option>
                        <option value="Gazole">Gazole</option>
                        <option value="E10">E10</option>
                        <option value="E85">E85</option>
                        <option value="GPLc">GPLc</option>
                    </Form.Select>
                </Form.Group>
            </Form>
            <button className="form-clear" onClick={clear}>Réinitialiser</button>
            <button className="form-submit" onClick={search}>Filtrer</button>
        </div>
    )
}