import React from "react";
import ListStations from "../../components/listStations/ListStations";
import { Container, Row } from "react-bootstrap"
import "./ListAccess.css";


export function ListAccess () {
    return (
        <Container>
            <Row className ="text-center m-3em">
                <h1>Liste des stations</h1>
            </Row>
            <ListStations />
        </Container>
    )
}