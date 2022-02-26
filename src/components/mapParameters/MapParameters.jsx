import React, {useContext} from "react";
import { useState } from 'react'
import { useNavigate } from "react-router";
import './MapParameters.css';
import {FilterModel} from "../model/filterModel";
import {FilterContext} from "../../contexts/FilterContext";
import {Form, Button, Row, Col} from 'react-bootstrap';

export default function MapParameters(props){
    const [limit, setLimit] = useState(0);
    const [road, setRoad] = useState("");
    const [distance, setDistance] = useState(0);
    const [price, setPrice] = useState(0);
    const [fuel, setFuel] = useState("");

    const navigate = useNavigate();
    const filterContext = useContext(FilterContext);

    const search = () => {
        let filter = new FilterModel(limit, road, distance, price, fuel);
        filter.checkFilters()
        filterContext.updateFilter(filter);
    }

    const clear = () => {
        setLimit(0);
        setRoad("");
        setDistance(0);
        setPrice(0);
        setFuel("");
        let filter = new FilterModel();
        filterContext.updateFilter(filter);
    }

    return (
        <div id="parameters" className="w-100">
            <h2 id="title-filter">Filters</h2>
            <Form className="form">
                <Form.Group className="mb-3">
                    <Form.Label>Limite : </Form.Label>
                    <Form.Control min="0" type="number" value={limit} onChange={(e) => setLimit(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Route : </Form.Label>
                    <Form.Control type="text" value={road} onChange={(e) => setRoad(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Distance (m) : </Form.Label>
                    <Form.Control min="0" className="form-input" type="number" value={distance} onChange={(e) => setDistance(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Prix (€) : </Form.Label>
                    <Form.Control min="0" className="form-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
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