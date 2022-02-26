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

    const navigate = useNavigate();
    const filterContext = useContext(FilterContext);

    const search = () => {
        let filter = new FilterModel(road, price, fuel);
        filter.checkFilters()
        filterContext.updateFilter(filter);
    }

    const clear = () => {
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
            <Row className="mt-3">
                <Col xs lg="3">
                    <Button variant="primary" onClick={search}>Rechercher</Button>
                </Col>
                <Col xs lg="3">
                    <Button variant="secondary" onClick={clear}>Réinitialiser</Button>
                </Col>
            </Row>
        </div>
    )
}